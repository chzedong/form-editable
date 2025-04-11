import { Input } from "antd";
import { Plugin } from "../../type";
import "./index.css";

export const InputRuntime: Plugin["provides"]["runtimeComponent"] = (props) => {
  const { field, value, onChange } = props;
  const { placeholder } = field.config;
  return (
    <Input
      placeholder={placeholder as string}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
