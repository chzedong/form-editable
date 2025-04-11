import { FormatField } from ".";
import { Plugin } from "../../type";

export const Runtime: Plugin<FormatField>["provides"]["runtimeComponent"] = (
  props
) => {
  const { value = "" } = props;

  return (
    <div>
      <div>{value as string}</div>
    </div>
  );
};
