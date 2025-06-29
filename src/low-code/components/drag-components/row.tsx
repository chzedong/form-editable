import React from "react";
import { Row } from "antd";
import { useFormDesignerStore } from "../../data-center/form-designer";
import { ColCom } from "./col";
import { useAnchorCtl } from "./hooks";
import "./index.css";
import { FormLayoutItem } from "../../type";

export const RowCom: React.FC<{
  layouts: FormLayoutItem[];
  notifyHover: (fieldId: string, point: "top" | "bottom" | DOMRect) => void;
}> = (props) => {
  const { layouts, notifyHover } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [state] = useFormDesignerStore();
  const { registry, fields } = state;

  const anchorFieldId = useAnchorCtl(containerRef);

  return (
    <Row gutter={16}>
      {layouts.map((layoutItem) => {
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
            notifyHover={notifyHover}
          >
            <Component field={field} />
          </ColCom>
        );
      })}
    </Row>
  );
};
