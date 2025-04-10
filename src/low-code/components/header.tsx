import { Button } from "antd";
import { useFormDesignerStore } from "../data-center/form-designer";
import "./header.css";

export const Header = () => {
  const [state, dispatch] = useFormDesignerStore();

  const submit = () => {
    dispatch({ type: "SUBMIT" });
  };

  console.log(state)
  return (
    <div className="layout-header">
      {state.appMeta.name}
      <Button type="primary" onClick={submit} className="submit-button">
        提交
      </Button>
    </div>
  );
};
