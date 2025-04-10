import { FieldMeta } from "../type";
import { ContextType } from "./types";

export const addField = async (context: ContextType, fieldMeta: FieldMeta) => {
  const { registry } = context.state;
  const { dispatch } = context;

  await registry.register("local", fieldMeta.type);

  const plugin = registry.getPlugin(fieldMeta.type);

  if (!plugin) {
    throw new Error(`Plugin not found for type: ${fieldMeta.type}`);
  }

  const field = plugin.createInitialField(fieldMeta);

  dispatch({
    type: "ADD_FIELD",
    payload: field,
  });
};