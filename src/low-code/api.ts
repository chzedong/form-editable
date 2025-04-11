import { Field, FieldMeta, FormLayout } from "./type";

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
        {
          id: 'format',
          type: 'format',
          label: '格式化',
          icon: 'icon-format'
        }
      ]);
    }, 1000);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveStorage = (appId: string, data: any) => {
  const old = localStorage.getItem(appId);
  if (old) {
    const oldData = JSON.parse(old);
    data = { ...oldData, ...data };
  }
  localStorage.setItem(appId, JSON.stringify(data));
};

export const saveAppFields = async (
  appId: string,
  fields: Record<string, Field>,
  layout: FormLayout
) => {
  saveStorage(appId, { fields, layout })
  console.log("save app fields: ", appId, fields, layout);
};

export const fetchAppFields = async (
  appId: string
): Promise<{ fields: Record<string, Field>; layout: FormLayout }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storage = localStorage.getItem(appId);
      resolve(JSON.parse(storage!));
    }, 1000);
  });
};

export const saveFormValue = async (
  appId: string,
  formMeta: { id: string },
  formValue: Record<string, unknown>
) => {

  saveStorage(appId, { formMeta, formValue });
};

export const fetchFormValue = async (
  appId: string
): Promise<{
  formMeta: { id: string };
  formValue: Record<string, unknown>;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storage = localStorage.getItem(appId);
      resolve(JSON.parse(storage!));
    }, 1000);
  });
};
