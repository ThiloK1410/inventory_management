import React from "react";
import Styles from "./quantity-card.module.css";

type QuantityCardProps = {
  text: string;
  detailText: string;
  quantity: string;
};

export const QuantityCard: React.FunctionComponent<QuantityCardProps> = props => (
  <div className={`${Styles.quantityCard} item-card`}>
    <div className={Styles.text}>
      <span>{props.text}</span>
      <span>{props.detailText}</span>
    </div>
    <div className={Styles.quantity}>{props.quantity}</div>
  </div>
);
