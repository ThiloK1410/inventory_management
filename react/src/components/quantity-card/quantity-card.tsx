import React from "react";
import { QuantityInput } from "../quantity-input/quantity-input";
import Styles from "./quantity-card.module.css";

type QuantityCardProps = {
  text: string;
  detailText: string;
  quantity: number;
  unit?: string;
  setQuantity?: (value: number) => void;
};

export const QuantityCard: React.FunctionComponent<QuantityCardProps> = props => {
  const getQuantity = () => {
    if (!props.unit)
      return props.quantity

    return <>{props.quantity} {props.unit}</>
  }

  return(
  <div className={`${Styles.quantityCard} item-card`}>
    <div className={Styles.text}>
      <span>{props.text}</span>
      <span>{props.detailText}</span>
    </div>
    {props.setQuantity && <QuantityInput quantity={props.quantity} setQuantity={props.setQuantity} />}
    <div className={Styles.quantity}>{getQuantity()}</div>
  </div>
);
};
