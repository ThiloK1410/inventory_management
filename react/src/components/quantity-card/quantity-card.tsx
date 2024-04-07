import React from "react";
import { QuantityInput } from "../change-value-button/quantity-input";
import Styles from "./quantity-card.module.css";

type QuantityCardProps = {
  text: string;
  detailText: string;
  quantity: number;
  unit: string;
  setQuantity: (value: number) => void
};



export const QuantityCard: React.FunctionComponent<QuantityCardProps> = props => (
  <div className={`${Styles.quantityCard} item-card`}>
    <div className={Styles.text}>
      <span>{props.text}</span>
      <span>{props.detailText}</span>
    </div>
    <QuantityInput quantity={props.quantity} setQuantity={props.setQuantity} />
    <div className={Styles.quantity}>{props.quantity} {props.unit}</div>
  </div>
);
