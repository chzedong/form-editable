import { ConfigPanel } from "../components/config-panel";
import { DragComponents } from "../components/drag-components";
import { Header } from "../components/header";
import { LeftPanel } from "../components/left-panel";
import "./layout.css";

export const Layout = () => {
  return (
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
  );
};
