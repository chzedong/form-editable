import { useRef } from "react";
import { Plugin } from "../../type";
import {
  createForm,
  Form,
  onFormMount,
  onFormValuesChange,
} from "@formily/core";
import { TextField, TextFormValues } from ".";
import { createSchemaField, FormProvider } from "@formily/react";
import {  Input, InputNumber } from "antd";
import { FormItem } from "../form-item";
import "./index.css";
import { Checkbox } from "../checkbox";

const field2FormValues = (field: TextField): TextFormValues => {
  return {
    label: field.config.label,
    placeholder: field.config.placeholder,
    required: field.config.validation.required,
    gte: field.config.validation.gte || undefined,
    lte: field.config.validation.lte || undefined,
  };
};

const formValues2Field = (
  oldField: TextField,
  values: TextFormValues
): TextField => {
  return {
    ...oldField,
    config: {
      label: values.label,
      placeholder: values.placeholder,
      validation: {
        required: values.required,
        gte: values.gte || null,
        lte: values.lte || null,
      },
    },
  };
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Checkbox,
    InputNumber
  },
});

export const ConfigPanel: Plugin["provides"]["configPanel"] = (props) => {
  const { field, handleField } = props;

  const formRef = useRef<Form>(null);

  if (!formRef.current) {
    formRef.current = createForm({
      initialValues: field2FormValues(field as TextField),
      effects: () => {
        onFormValuesChange((form) => {
          handleField(formValues2Field(field as TextField, form.values));
        });

        onFormMount(() => {
          form.validate();
        });
      },
    });
  }

  const form = formRef.current;

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
              placeholder: {
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "请输入",
                },
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "占位符",
                  name: "placeholder",
                },
              },
              // 是否必填
              required: {
                type: "boolean",
                "x-component": "Checkbox",
                "x-component-props": {
                  valuePropName: "checked", // 添加这一行
                },
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "是否必填",
                  name: "required",
                },
              },
              gte: {
                type: "number",
                "x-component": "InputNumber",
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "最小值",
                  name: "gte",
                },
              },
              lte: {
                type: "number",
                "x-component": "InputNumber",
                "x-decorator": "FormItem",
                "x-decorator-props": {
                  label: "最大值",
                  name: "lte",
                },
              },

            },
          }}
        />
      </FormProvider>
    </div>
  );
};
