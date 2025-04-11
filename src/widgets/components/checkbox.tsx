
import { Checkbox as AntdCheckbox } from "antd";

export const Checkbox:React.FC<{checked: boolean}> = (props) => {
  return (
    <AntdCheckbox {...props} value={props.checked}  />
  )
}