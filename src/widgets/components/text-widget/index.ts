import { Field, FieldMeta } from "../../../low-code/type";
import { randomId } from "../../../low-code/utils";
import { Plugin } from "../../type";
import { ConfigPanel } from "./config-panel";
import { InputModel } from "./input-model";
import { InputRuntime } from "./input-runtime";

export interface TextField extends Field {
  config: {
    label: string;
    placeholder: string;
    validation: {
      required: boolean;
      gte: number | null;
      lte: number | null;
    }
  };
}

export interface TextFormValues {
  label: string;
  placeholder: string;
  required: boolean;
  gte?: number;
  lte?: number;
}

export default {
  id: "text",
  type: "text",
  descriptor: "文本类型插件",
  beforeRegister: () => {
    console.log("before register");
  },
  init: async () => {
    console.log("init text widget");
  },
  createInitialField: (fieldMeta: FieldMeta): TextField => {
    return {
      id: randomId(),
      type: fieldMeta.type,
      config: {
        label: "文本框",
        placeholder: "请输入文本",
        validation: {
          required: false,
          gte: 0,
          lte: null,
        },
      },
    };
  },

  provides: {
    dragComponent: InputModel,
    configPanel: ConfigPanel,
    runtimeComponent: InputRuntime,
  },
} as Plugin;
