import { useRef } from "react";
import { Plugin } from "../../type";
import {
  createForm,
  Form,
  onFormMount,
  onFormValuesChange,
} from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import { Input, Select } from "antd";
import { FormItem } from "../form-item";
import "./index.css";
import { FormatField, FormatFormValues } from ".";

const field2FormValues = (field: FormatField): FormatFormValues => {
  return {
    label: field.config.label,
    format: field.config.format,
    dependencies: field.config.dependencies,
  };
};

const formValues2Field = (
  oldField: FormatField,
  values: FormatFormValues
): FormatField => {
  return {
    ...oldField,
    config: {
      label: values.label,
      format: values.format,
      dependencies: values.dependencies,
    },
  };
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
});

export const ConfigPanel: Plugin<FormatField>["provides"]["configPanel"] = (props) => {
  const { field, handleField, fields } = props;

  const formRef = useRef<Form>(null);

  if (!formRef.current) {
    formRef.current = createForm({
      initialValues: field2FormValues(field as FormatField),
      effects: () => {
        onFormValuesChange((form) => {
          handleField(formValues2Field(field as FormatField, form.values));
        });

        onFormMount(() => {
          form.validate();
        });
      },
    });
  }

  const form = formRef.current;

  const options = Object.keys(fields)
    .filter((key) => key !== field.id)
    .map((key) => {
      return {
        label: fields[key].config.label,
        value: key,
      };
    });

  return (
    <div className="text-widget-config-panel">
      <FormProvider form={form}>
        <SchemaField
          schema={{
            type: "object",
            properties: {
              label: {
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "请输入",
                },
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "字段名称",
                  name: "label",
                },
                required: true,
              },
              // select
              dependencies: {
                type: "array",
                "x-component": "Select",
                "x-component-props": {
                  placeholder: "请选择",
                  mode: "multiple",
                  options: options,
                },
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "关联字段",
                  name: "dependencies",
                },
              },
              // format input
              format: {
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "请输入",
                },
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "格式化表达式",
                  name: "format",
                },
              },
            },
          }}
        />
      </FormProvider>
    </div>
  );
};
