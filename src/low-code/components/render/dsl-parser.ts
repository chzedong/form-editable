import { FieldValidator } from "@formily/core";
import { Field } from "../../type";

export class DslParser {
  static parseValidator(field: Field): FieldValidator {
    const { config } = field;
    const validation: Field["config"]["validation"] = config.validation || {
      required: false,
      gte: null,
      lte: null,
    };

    const validatorQueue: FieldValidator = [];

    if (typeof validation.required === "boolean") {
      validatorQueue.push({
        required: validation.required,
      });
    }

    if (validation.gte !== null) {
      validatorQueue.push({
        min: validation.gte,
      });
    }

    if (validation.lte !== null) {
      validatorQueue.push({
        max: validation.lte,
      });
    }

    return validatorQueue;
  }

  static parseFormItemProps(field: Field) {
    const { config, id } = field;
    const validation: Field["config"]["validation"] = config.validation || {
      required: false,
      gte: null,
      lte: null,
    };
    const label = config.label;
    const name = id;

    const formItemProps: Record<string, unknown> = { label, name };

    if (typeof validation.required === "boolean") {
      formItemProps.required = validation.required;
    }

    return formItemProps;
  }
}
