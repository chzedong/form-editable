import { useEffect, useState } from "react";
import { useFormRenderStore } from "../../data-center/form-render";
import { fetchAppFields, fetchFormValue } from "../../api";
import { randomId } from "../../utils";

export const usePrepare = () => {
  const [state, dispatch] = useFormRenderStore();
  const appId = state.appMeta.id;
  const { registry } = state;

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchAppFields(appId).then(({ fields, layout }) => {
      dispatch({ type: "COMMON", payload: { fields, formLayout: layout } });

      // 加载物料
      let types = Object.values(fields).map((item) => item.type);
      types = [...new Set(types)];
      const promises = types.map((type) => registry.register("local", type));

      Promise.all(promises).then(() => {
        console.log("加载完成");
        setIsPending(false);
      });
    });

    fetchFormValue(appId).then(({ formMeta, formValue }) => {
      if (!formMeta) {
        dispatch({ type: "COMMON", payload: { formMeta: { id: randomId() } } });
        return;
      }
      dispatch({ type: "COMMON", payload: { formMeta, formValue } });
    });
  }, [appId]);

  return {
    isPending,
  };
};
