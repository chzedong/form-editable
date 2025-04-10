import React from "react";
import { Row } from "antd";
import { useFormDesignerStore } from "../../data-center/form-designer";
import { ColCom } from "./col";
import { useAnchorCtl, useOptionsRenderer } from "./hooks";
import "./index.css";

export const DragComponents: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [state] = useFormDesignerStore();
  const { registry, fields, formLayout } = state;

  const anchorFieldId = useAnchorCtl(containerRef);
  const optionsRenderer = useOptionsRenderer(containerRef);

  return (
    <div className="drag-components" ref={containerRef}>
      {formLayout.map((item, index) => {
        return (
          <Row key={index} gutter={16}>
            {item.map((layoutItem) => {
              const { fieldId } = layoutItem;
              const field = fields[fieldId];
              const plugin = registry.getPlugin(field.type);
              const Component = plugin.provides.dragComponent;
              const isAnchor = fieldId === anchorFieldId;
              if (!field) {
                throw new Error(`Field not found: ${fieldId}`);
              }
              return (
                <ColCom
                  layoutItem={layoutItem}
                  isAnchor={isAnchor}
                  key={fieldId}
                >
                  <Component field={field} />
                </ColCom>
              );
            })}
          </Row>
        );
      })}
      {optionsRenderer}
    </div>
  );
};
