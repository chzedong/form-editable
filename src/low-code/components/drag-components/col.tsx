import { Col } from "antd";
import { FormLayoutItem } from "../../type";
import { ReactNode } from "react";
import classNames from "classnames";

export const ColCom: React.FC<{
  layoutItem: FormLayoutItem;
  isAnchor: boolean;
  children: ReactNode;
}> = ({ layoutItem, isAnchor, children }) => {
  const { fieldId, flex } = layoutItem;
  const span = 24 * flex;
  
  return (
    <Col
      span={span}
      key={fieldId}
      data-field-id={fieldId}
      className={classNames("form-grid-col", {
        "anchor-field": isAnchor,
      })}
    >
      {children}
    </Col>
  );
};
