import { Col } from "antd";
import { FormLayoutItem } from "../../type";
import { ReactNode, useRef } from "react";
import classNames from "classnames";
import { useDrag, useDrop } from "react-dnd";

interface DragItem {
  id: string;
  type: string;
  hoverId: string;
  hoverIdPoint: "top" | "bottom" | 'left' | 'right';
}

// 阈值
const TOP_OFFSET = 10;

export const ColCom: React.FC<{
  layoutItem: FormLayoutItem;
  isAnchor: boolean;
  children: ReactNode;
  notifyHover: (fieldId: string, point: "top" | "bottom" | DOMRect) => void;
}> = ({ layoutItem, isAnchor, children, notifyHover }) => {
  const { fieldId, flex } = layoutItem;
  const span = 24 * flex;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ItemTypes.KNIGHT",
    item: () => {
      return { id: fieldId };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { handlerId: any | null }
  >({
    accept: "ItemTypes.KNIGHT",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const { x, y } = monitor.getClientOffset() as { x: number; y: number };
      const refRect = ref.current.getBoundingClientRect();

      if (y < refRect?.top + TOP_OFFSET) {
        notifyHover(fieldId, "top");
        item.hoverIdPoint = "top";
        item.hoverId = fieldId;
        return;
      }

      if (y > refRect?.top + refRect?.height - TOP_OFFSET) {
        notifyHover(fieldId, "bottom");
        item.hoverIdPoint = "bottom";
        item.hoverId = fieldId;
        return;
      }

      const centerX = refRect.left + refRect.width / 2;

      if (x > centerX) {
        notifyHover(
          fieldId,
          new DOMRect(refRect.right, refRect.top, 2, refRect.height)
        );
        item.hoverIdPoint = "right";
        item.hoverId = fieldId;
        return;
      }

      if (x < centerX) {
        notifyHover(
          fieldId,
          new DOMRect(refRect.left, refRect.top, 2, refRect.height)
        );
        item.hoverIdPoint = "left";
        item.hoverId = fieldId;
        return;
      }
    },
  });
  drag(drop(ref));
  return (
    <Col
      ref={ref}
      span={span}
      key={fieldId}
      data-field-id={fieldId}
      data-handler-id={handlerId}
      className={classNames("form-grid-col", {
        "anchor-field": isAnchor,
      })}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </Col>
  );
};
