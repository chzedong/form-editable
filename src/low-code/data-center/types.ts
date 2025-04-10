import React from "react";
import { WidgetRegistry } from "../../widgets/widget-registry";
import { FormLayout, Field, AppMeta, FieldMeta } from "../type";

export interface FormDesignerState {
  registry: WidgetRegistry; // 组件注册表， 物料中心
  formLayout: FormLayout; // 表单布局，布局协议
  fields: Record<string, Field>; // 字段模型映射表，对应后端协议，表单转换值
  appMeta: AppMeta; // 应用元数据，应用的基本信息
  fieldsMeta: FieldMeta[]; // 字段元数据，字段的基本信息
  anchorFieldId?: string; // 锚点字段ID，当前选中的字段
}

interface ActionSetFormLayout {
  type: "SET_FORM_LAYOUT";
  payload: FormLayout;
}

interface ActionSetFields {
  type: "SET_FIELDS";
  payload: Record<string, Field>;
}

interface ActionSetAppMeta {
  type: "SET_APP_META";
  payload: AppMeta;
}

interface ActionAddField {
  type: "ADD_FIELD";
  payload: Field;
}

interface ActionSubmit {
  type: "SUBMIT";
}

interface ActionAddFieldMeta {
  type: "SET_FIELD_META";
  payload: FieldMeta[];
}

interface ActionCommon {
  type: "COMMON";
  payload: Partial<FormDesignerState>;
}

export type Action =
  | ActionSetFormLayout
  | ActionSetFields
  | ActionSetAppMeta
  | ActionAddField
  | ActionSubmit
  | ActionAddFieldMeta
  | ActionCommon;
  
export type ContextType = {
  state: FormDesignerState;
  dispatch: React.ActionDispatch<[action: Action]>;
};

