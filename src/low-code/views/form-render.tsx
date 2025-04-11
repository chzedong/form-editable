import { FormRenderProvider } from "../data-center/form-render";
import { FormRender } from "../components/render";

export const FormRenderLayout = () => {
  return (
    <FormRenderProvider
      appMeta={{
        id: "1",
        name: "表单编排",
        description: "表单编排描述",
      }}
    >
      <FormRender />
    </FormRenderProvider>
  );
};
