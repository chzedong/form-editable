import { FieldMeta } from "./type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchFormDesignerMeta = async (
  appId: string
): Promise<FieldMeta[]> => {
  // 模拟网络请求
  console.log("Fetching form designer meta for appId:", appId);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "text",
          type: "text",
          label: "文本框",
          icon: "icon-text",
        },
        {
          id: "number",
          type: "number",
          label: "数字输入框",
          icon: "icon-number",  
        },
        {
          id: "select",
          type: "select",
          label: "下拉选择框",
          icon: "icon-select",
        },
      ]);
    }, 1000);
  });
};
