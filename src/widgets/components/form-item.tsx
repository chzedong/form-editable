import { connect, mapProps, useForm } from "@formily/react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = (props: any) => {
  const { name, required } = props;
  const style = {};

  const form = useForm();
  const fieldState = form.getFieldState(name);
  // const field = useField();

  // console.log("field render:", field, label, fieldState, props);

  return (
    <p style={style}>
      {required && <span style={{ color: "red" }}>*</span>}
      {props.label}: {props.children}
      {fieldState.selfErrors && <div>{fieldState.selfErrors[0]}</div>}
    </p>
  );
};

// FormItem UI组件
export const FormItem = connect(
  Item,
  mapProps(
    {
      title: "label",
      description: "extra",
      required: true,
      validateStatus: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props, field: any) => {
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      };
    }
  )
);
