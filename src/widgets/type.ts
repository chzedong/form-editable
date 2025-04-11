import { Form } from "@formily/core";
import { Field, FieldMeta } from "../low-code/type";

// 插件构建类型 本地插件 | 远程插件
export type PluginType = "local" | "remote";

export interface PluginLoader {
  load: (descriptor: PluginDescriptor) => Promise<Plugin>;
}

export type PluginDescriptor = string;

export interface Plugin<T extends Field = Field> {
  id: string; // 唯一标识符
  type: string; // 插件类型
  descriptor: PluginDescriptor; // 插件描述符

  beforeRegister?: () => void; // 注册前的钩子函数
  init: () => Promise<void>; // 初始化函数
  destroy?: () => void; // 销毁函数
  createInitialField: (fieldMeta: FieldMeta) => T; // 创建初始字段的函数

  // 联动函数
  reactionCallback?: (
    field: T,
    form: Form,
    validSign: { isValid: boolean }
  ) => void | Promise<void>;

  provides: {
    dragComponent: React.FC<{ field: T }>; // 拖拽组件
    configPanel: React.FC<{
      field: T;
      fields: Record<string, Field>;
      handleField: (field: T) => void;
    }>; // 配置面板
    runtimeComponent: React.FC<{
      field: T;
      value: unknown;
      onChange: (value: unknown) => void;
    }>;
  };
}
