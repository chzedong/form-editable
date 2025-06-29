import React from "react";
import { useFormDesignerStore } from "../../data-center/form-designer";
import { useAnchorCtl, useOptionsRenderer } from "./hooks";
import { RowCom } from "./row";
import { useDrop } from "react-dnd";
import {
  calculateRowLine,
  findFieldIndex,
  insertField,
} from "./layout-calculate";
import "./index.css";

export const DragModel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [state, dispatch] = useFormDesignerStore();
  const { formLayout } = state;

  const optionsRenderer = useOptionsRenderer(containerRef);
  useAnchorCtl(containerRef);

  const [rect, setRect] = React.useState<DOMRect | null>(null);

  const [, drop] = useDrop({
    accept: "ItemTypes.KNIGHT",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: (item: any) => {
      const newFormLayout = insertField(
        formLayout,
        item.id,
        item.hoverId,
        item.hoverIdPoint
      );
      dispatch({
        type: "COMMON",
        payload: {
          formLayout: newFormLayout,
        },
      });

      setRect(null);
    },
  });

  drop(containerRef);
  const handleHover = (fieldId: string, point: "top" | "bottom" | DOMRect) => {
    if (typeof point === "string" && containerRef.current) {
      const fieldInfo = findFieldIndex(fieldId, formLayout);
      const line = calculateRowLine(
        containerRef.current,
        fieldInfo.rowIndex,
        point
      );
      if (line) {
        setRect(line.rect);
      }
    } else {
      setRect(point as DOMRect);
    }
  };

  const containerRect = containerRef.current?.getBoundingClientRect();
  return (
    <div className="drag-components" ref={containerRef}>
      {formLayout.map((item, index) => {
        return <RowCom key={index} layouts={item} notifyHover={handleHover} />;
      })}
      {optionsRenderer}
      {rect && (
        <div
          className="drag-components-hover"
          style={{
            left: rect.left - (containerRect?.left || 0),
            top: rect.top - (containerRect?.top || 0),
            width: rect.width,
            height: rect.height,
          }}
        ></div>
      )}
    </div>
  );
};
