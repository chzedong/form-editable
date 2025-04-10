import { useEffect, useMemo, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useFormDesignerStore } from "../../data-center/form-designer";
import { Button } from "antd";

export const useAnchorCtl = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [{ anchorFieldId }, dispatch] = useFormDesignerStore();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-field-id]");
      const fieldId = target?.getAttribute("data-field-id");
      if (fieldId) {
        dispatch({
          type: "COMMON",
          payload: {
            anchorFieldId: fieldId,
          },
        });
      }
    };

    containerRef.current.addEventListener("click", handleClick);

    return () => {
      containerRef.current?.removeEventListener("click", handleClick);
    };
  }, []);

  return anchorFieldId;
};

export const useOptionsRenderer = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [state, dispatch] = useFormDesignerStore();
  const { anchorFieldId, fields, formLayout } = state;

  const [point, setPoint] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const targetField = containerRef.current.querySelector(
      `[data-field-id="${anchorFieldId}"]`
    );
    const rect = targetField?.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    if (rect) {
      setPoint({
        x: rect.right - containerRect.left,
        y: rect.top - containerRect.top,
      });
    } else {
      setPoint({
        x: -1,
        y: -1,
      });
    }
  }, [anchorFieldId]);

  const deleteField = () => {
    if (!anchorFieldId) {
      return;
    }

    delete fields[anchorFieldId];
    // 处理布局
    const newFormLayout = formLayout.map((row) => {
      return row.filter((item) => item.fieldId !== anchorFieldId);
    }).filter((row) => row.length > 0);

    dispatch({
      type: "COMMON",
      payload: {
        formLayout: newFormLayout,
        fields: { ...fields },
        anchorFieldId: Object.keys(fields)[0] || undefined,
      },
    });
  };

  const optionsRenderer = useMemo(() => {
    const hidden = point.x === -1;

    return (
      <div
        className="options-renderer"
        style={{
          left: point.x,
          top: point.y,
          display: hidden ? "none" : "block",
        }}
      >
        <Button onClick={deleteField} type="primary">
          <CloseCircleOutlined />
        </Button>
      </div>
    );
  }, [point.x, point.y]);

  return optionsRenderer;
};
