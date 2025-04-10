import { Field } from "../../../low-code/type";
import './index.css';

export const InputModel: React.FC<{ field: Field }> = (props) => {
  const { field } = props;
  const { config } = field;
  const { label, placeholder } = config;
  return (
    <div>
      <label>{label as string}</label>
      <div className="text-input-model">{placeholder as string}</div>
    </div>
  );
};
