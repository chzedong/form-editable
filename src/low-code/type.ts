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
    // 通用校验规则 需要进行DSL解析
    validation?: {
      required: boolean;
      gte: number | null;
      lte: number | null;
    }
    // 通用联动规则 需要进行DSL解析 并配合物料计算函数
    // dependencies?: {
    //   [key: string]: unknown; // 其他属性
    // }
  }
}

export interface AppMeta {
  id: string; // 唯一标识符
  name: string; // 应用名称
  description: string; // 应用描述
}
