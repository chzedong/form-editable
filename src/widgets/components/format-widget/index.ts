import { Form } from "@formily/core";
import { Field, FieldMeta } from "../../../low-code/type";
import { randomId } from "../../../low-code/utils";
import { Plugin } from "../../type";
import { ConfigPanel } from "./config-panel";
import { Model } from "./model";
import { Runtime } from "./runtime";

export interface FormatField extends Field {
  config: {
    label: string;
    format: string;
    dependencies: string[];
  };
}

class Sign {
  stampSign: Record<string, { stamp: number; num: number }> = {};

  maxSecond = 1000;

  handlerWrapper = (id: string, handler: any) => {
    const now = Date.now();
    const oldStamp = this.stampSign[id]?.stamp;
    const oldNum = this.stampSign[id]?.num;

    if (!oldStamp || now - oldStamp > this.maxSecond) {
      this.stampSign[id] = {
        stamp: now,
        num: 0,
      };
      return () => handler();
    }

    // 指数退避算法
    const gap = Math.min(this.maxSecond, Math.pow(2, oldNum));

    // 增加次数
    this.stampSign[id].num++;

    console.log("gap", gap);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (...args: any[]) => {
      await new Promise((resolve) => setTimeout(resolve, gap));
      return handler(...args);
    };
  };
}

const sign = new Sign();

export interface FormatFormValues {
  label: string;
  format: string;
  dependencies: string[];
}

export default {
  id: "format",
  type: "format",
  descriptor: "格式化插件",
  beforeRegister: () => {
    console.log("before register");
  },
  init: async () => {
    console.log("init text widget");
  },
  createInitialField: (fieldMeta: FieldMeta): FormatField => {
    return {
      id: randomId(),
      type: fieldMeta.type,
      config: {
        label: "格式化",
        format: "",
        dependencies: [],
      },
    };
  },

  reactionCallback: (
    field: FormatField,
    form: Form,
    validSign: { isValid: boolean }
  ) => {
    const { format, dependencies } = field.config;

    const values: string[] = [];
    for (let i = 0; i < dependencies.length; i++) {
      const id = dependencies[i];
      values.push(form.query(id).get("value") as string);
    }

    const handler = () => {
      if (!validSign.isValid) {
        return;
      }

      form.setFieldState(field.id, (state) => {
        let index = -1;
        const v = format.replace(/\$[0-9]/g, () => {
          index++;
          return values[index] || "";
        });

        state.value = v;
      });
    };

    return sign.handlerWrapper(field.id, handler)();
  },

  provides: {
    dragComponent: Model,
    configPanel: ConfigPanel,
    runtimeComponent: Runtime,
  },
} as Plugin<FormatField>;
