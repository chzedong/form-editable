import { ConfigPanel } from "../components/config-panel";
import { DragComponents } from "../components/drag-components";
import { Header } from "../components/header";
import { LeftPanel } from "../components/left-panel";
import { FormDesignerProvider } from "../data-center/form-designer";
import "./layout.css";

export const Layout = () => {
  return (
    <FormDesignerProvider
      appMeta={{
        id: "1",
        name: "表单编排",
        description: "表单编排描述",
      }}
    >
      <div className="layout">
        <div className="header">
          <Header />
        </div>

        <div className="main">
          <div className="left">
            <LeftPanel />
          </div>
          <div className="center">
            <DragComponents />
          </div>
          <div className="right">
            <ConfigPanel />
          </div>
        </div>
      </div>
    </FormDesignerProvider>
  );
};
