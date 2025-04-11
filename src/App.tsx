import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./low-code/views/layout";
import { FormRenderLayout } from "./low-code/views/form-render";
import { useEffect } from "react";
import "./App.css";

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
    Component: FormRenderLayout,
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
