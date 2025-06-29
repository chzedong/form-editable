import { FormLayout, FormLayoutItem } from "../../type";

// 根据坐标计算拖拽到哪个位置 前后左右
export const calculatePoint = (
  x: number,
  y: number,
  target: HTMLElement,
  defaultOffset = 2
):
  | { point: "top" | "bottom" | "left" | "right"; rect?: DOMRect }
  | undefined => {
  const targetRect = target.getBoundingClientRect();
  const { top, height, left, width, right } = targetRect;

  if (y < top + defaultOffset) {
    return { point: "top" };
  }

  if (y > top + height - defaultOffset) {
    return { point: "bottom" };
  }

  const centerX = left + width / 2;

  if (x >= centerX) {
    return { point: "right", rect: new DOMRect(right, top, 2, height) };
  }

  if (x < centerX) {
    return { point: "left", rect: new DOMRect(left, top, 2, height) };
  }
};

export const findFieldIndex = (fieldId: string, layout: FormLayout) => {
  for (let i = 0; i < layout.length; i++) {
    const item = layout[i];
    const fieldIndex = item.findIndex((child) => child.fieldId === fieldId);
    if (fieldIndex !== -1) {
      return {
        rowIndex: i,
        fieldIndex,
      };
    }
  }

  throw new Error("布局错误");
};

export const calculateRowLine = (
  container: HTMLElement,
  index: number,
  point: "top" | "bottom"
) => {
  const rowNodes = container.querySelectorAll(":scope > .ant-row");
  const rowElement = rowNodes[index];
  if (!rowElement) {
    return;
  }
  const rect = rowElement.getBoundingClientRect();
  if (point === "top") {
    return {
      insertIndex: index,
      rect: new DOMRect(rect.left, rect.top, rect.width, 2),
    };
  }
  return {
    insertIndex: index + 1,
    rect: new DOMRect(rect.left, rect.bottom, rect.width, 2),
  };
};

export const insertField = (
  layout: FormLayout,
  dragFieldId: string,
  targetFieldId: string,
  point: "top" | "bottom" | "left" | "right"
) => {
  const newLayout: FormLayout = [];

  const dragLine = findFieldIndex(dragFieldId, layout);
  const targetLine = findFieldIndex(targetFieldId, layout);

  if (point === "left" || point === "right") {
    if (dragFieldId === targetFieldId) {
      return;
    }

    layout.forEach((item, index) => {
      // 命中拖拽行
      if (index === dragLine?.rowIndex) {
        const newLine = item.map((field) => {
          if (field.fieldId === dragFieldId) {
            return undefined;
          }

          const num =
            dragLine.rowIndex === targetLine.rowIndex
              ? item.length
              : item.length + 1;
          const flex = 1 / num;
          return { flex, fieldId: field.fieldId };
        });
        if (newLine.length > 0) {
          newLayout.push(newLine.filter((field) => field !== undefined));
        }
      }

      // 命中目标行
      if (index === targetLine.rowIndex) {
        const flex = 1 / (item.length + 1);
        const newLine = item.map((field) => {
          return { flex, fieldId: field.fieldId };
        });

        return newLine.splice(targetLine.fieldIndex, 0, {
          flex,
          fieldId: dragFieldId,
        });
      }

      newLayout.push([...item]);
    });

    return newLayout;
  }

  if (point === "top" || point === "bottom") {
    // 先处理旧行
    const newLayout: FormLayout = [];
    layout.forEach((item, index) => {
      if (index === dragLine?.rowIndex) {
        const newLine: FormLayoutItem[] = [];

        item.forEach((field) => {
          if (field.fieldId === dragFieldId) {
            return undefined;
          }
          const flex = 1 / item.length + 1;
          newLine.push({ flex, fieldId: field.fieldId });
        });

        if (newLine.length > 0) {
          newLayout.push(newLine);
        }
      }

      newLayout.push([...item]);
    });

    if (point === "top") {
      const newLine: FormLayoutItem[] = [{ flex: 1, fieldId: dragFieldId }];
      return newLayout.splice(targetLine.rowIndex, 0, newLine);
    }

    if (point === "bottom") {
      const newLine: FormLayoutItem[] = [];
      return newLayout.splice(targetLine.rowIndex + 1, 0, newLine);
    }

    return;
  }
};
