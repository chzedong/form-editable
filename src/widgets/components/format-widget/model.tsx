import { FormatField } from ".";

export const Model: React.FC<{ field: FormatField }> = (props) => {
  const { field } = props;
  const { config } = field as FormatField;
  const { label, format } = config;
  
  return (
    <div>
      <label htmlFor="">{label}</label>
      <div>{format}</div>
    </div>
  );
};
