import React from "react";
import { WidgetRegistry } from "../../widgets/widget-registry";
import { FormLayout, Field, AppMeta } from "../type";

export interface FormRenderState {
  registry: WidgetRegistry; // 组件注册表， 物料中心
  formLayout: FormLayout; // 表单布局，布局协议
  fields: Record<string, Field>; // 字段模型映射表，对应后端协议，表单转换值
  appMeta: AppMeta; // 应用元数据，应用的基本信息
  formMeta: {
    id: string
  }
  formValue: Record<string, unknown>
}


interface ActionCommon {
  type: "COMMON";
  payload: Partial<FormRenderState>;
}

export type Action = ActionCommon;
  
export type RenderContextType = {
  state: FormRenderState;
  dispatch: React.ActionDispatch<[action: Action]>;
};

