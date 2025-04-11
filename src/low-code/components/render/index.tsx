import { createRef, useEffect } from "react";
import { useFormRenderStore } from "../../data-center/form-render";
import { saveFormValue } from "../../api";
import { Field, FormProvider } from "@formily/react";
import { createForm, Form, onFormMount } from "@formily/core";
import { Button, Col, Row } from "antd";
import { FormItem } from "../../../widgets/components/form-item";
import { DslParser } from "./dsl-parser";
import { ReactionRegistry } from "./reactions";
import { usePrepare } from "./hook";
export const FormRender = () => {
  const [state] = useFormRenderStore();
  const appId = state.appMeta.id;
  const { fields, formLayout, registry, formValue } = state;

  
  const reactionRegistry = createRef<ReactionRegistry>(); // 表单联动器绑定位置
  const formRef = createRef<Form>(); // 表单绑定位置
  
  // 业务数据准备
  const { isPending } = usePrepare();
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!formRef.current) {
    // 表单模型初始化
    formRef.current = createForm({
      initialValues: formValue,
      effects: () => {
        onFormMount(() => {
          // 表单加载完毕，注册联动器
          Object.values(fields).forEach((field) => {
            const callback = registry.getPlugin(field.type).reactionCallback;
            if (callback) {
              reactionRegistry.current?.registerReaction(field, callback);
            }
          });
        });
      },
    });
    // 表单联动器初始化
    reactionRegistry.current = new ReactionRegistry(formRef.current);
  }

  const form = formRef.current;
  console.log("form: ", form)

  const submit = async () => {
    await form.submit();
    saveFormValue(appId, state.formMeta, form.values);

    window.location.href = "/";
  };

  console.log(fields, formLayout);
  return (
    <div style={{padding: "16px"}}>
      <h1>编辑表单</h1>
      <FormProvider form={form}>
        {formLayout.map((items, index) => {
          return (
            <Row key={index} gutter={16}>
              {items.map((layoutItem) => {
                const { fieldId, flex } = layoutItem;
                const field = fields[fieldId];
                const plugin = registry.getPlugin(field.type);
                const Component = plugin.provides.runtimeComponent;
                if (!field) {
                  throw new Error(`Field not found: ${fieldId}`);
                }

                const span = 24 * flex;

                return (
                  <Col span={span} key={fieldId} data-field-id={fieldId}>
                    <Field
                      key={fieldId}
                      name={fieldId}
                      title={field.config.label} // DSL约定
                      component={[Component, { field }]}
                      validator={DslParser.parseValidator(field)} // DSL解析
                      decorator={[
                        FormItem,
                        DslParser.parseFormItemProps(field), // DSL解析
                      ]}
                    />
                  </Col>
                );
              })}
            </Row>
          );
        })}

        <div>
          <Button type="primary" onClick={() => submit()}>
            提交
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};
