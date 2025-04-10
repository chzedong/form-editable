import { useEffect } from "react";
import { fetchFormDesignerMeta } from "../api";
import { useFormDesignerStore } from "../data-center/form-designer";
import "./left-panel.css";
import { FieldMeta } from "../type";
import { addField } from "../data-center/utils";

export const LeftPanel = () => {

  const [state, dispatch] = useFormDesignerStore();

  const { appMeta, fieldsMeta } = state;

  useEffect(() => {
    const appId = appMeta.id;
    fetchFormDesignerMeta(appId).then((meta) => {
      dispatch({ type: "SET_FIELD_META", payload: meta });
    })
  }, [appMeta.id, dispatch]);

  const handleFieldClick = (fieldMeta: FieldMeta) => {
    addField({ state, dispatch }, fieldMeta);
  }

  return (
    <div className="left-panel">
      <div className="left-panel-header">
        <h2>组件</h2>
      </div>
      <div className="left-panel-content">
        {fieldsMeta.map((fieldMeta) => {
          return (
            <div className="left-panel-item" key={fieldMeta.id} onClick={() =>handleFieldClick(fieldMeta)}>
              <div className="left-panel-item-name">{fieldMeta.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
