import { useRef } from "react";
import { Plugin } from "../../type";
import { createForm, Form, onFormMount, onFormValuesChange } from "@formily/core";
import { TextField, TextFormValues } from ".";
import { createSchemaField, FormProvider } from "@formily/react";
import { Input } from "antd";
import { FormItem } from "../form-item";
import "./index.css";

const field2FormValues = (field: TextField): TextFormValues => {
  return {
    label: field.config.label,
    placeholder: field.config.placeholder,
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
    },
  };
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
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
                  label: "输入框",
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
            },
          }}
        />
      </FormProvider>
    </div>
  );
};
