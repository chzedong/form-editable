export interface FormLayoutItem {
  flex: number;
  fieldId: string;
}

export type FormLayout = FormLayoutItem[][];

export interface FieldMeta {
  id: string; // 唯一标识符
  type: string; // 字段类型
  label: string; // 显示名称
  icon: string; // 图标
}

export interface Field {
  id: string; // 唯一标识符
  type: string; // 字段类型
  config: {
    [key: string]: unknown; // 其他属性
  }
}

export interface AppMeta {
  id: string; // 唯一标识符
  name: string; // 应用名称
  description: string; // 应用描述
}
