import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./low-code/views/layout";
import { FormRender } from "./low-code/views/form-render";
import { FormDesignerProvider } from "./low-code/data-center/form-designer";
import "./App.css";
import { useEffect } from "react";

// 路由配置
const router = createBrowserRouter([
  // 表单编排页面
  {
    path: "/designer",
    Component: Layout,
  },
  // 表单渲染页面
  {
    path: "/render",
    Component: FormRender,
  },
]);

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/designer";
    }
  }, []);

  return (
    <div className="App">
      <FormDesignerProvider
        appMeta={{
          id: "1",
          name: "表单编排",
          description: "表单编排描述",
        }}
      >
        <RouterProvider router={router} />
      </FormDesignerProvider>
    </div>
  );
}

export default App;
