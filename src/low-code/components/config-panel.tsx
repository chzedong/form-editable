import { useFormDesignerStore } from "../data-center/form-designer";
import { Field } from "../type";

export const ConfigPanel = () => {
  const [{ registry, anchorFieldId, fields }, dispatch] =
    useFormDesignerStore();

  if (!anchorFieldId) {
    return null;
  }

  const field = fields[anchorFieldId];
  const plugin = registry.getPlugin(field.type);
  const ConfigPanelComponent = plugin.provides.configPanel;

  const handleField = (field: Field) => {
    dispatch({
      type: "SET_FIELDS",
      payload: {
        ...fields,
        [anchorFieldId]: field,
      },
    });
  };

  return (
    <div className="config-panel">
      <ConfigPanelComponent
        key={anchorFieldId}
        field={field}
        fields={fields}
        handleField={handleField}
      />
    </div>
  );
};
