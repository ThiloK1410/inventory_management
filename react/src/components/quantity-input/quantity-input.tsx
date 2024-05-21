import { Button } from "primereact/button";
import React from "react";
import Styles from "./quantity-input.module.css";
import { InputNumber } from "primereact/inputnumber";

type QuantityInputProps = {
  quantity: number;
  decrementDisabled: boolean;
  setQuantity: (value: number) => void;
};

export const QuantityInput: React.FunctionComponent<QuantityInputProps> = props => {
  return (
    <div className={Styles.quantityInput}>
      <Button
        rounded
        disabled={props.decrementDisabled}
        className={Styles.decreaseButton}
        icon="fa-solid fa-minus"
        onClick={() => props.setQuantity(props.quantity - 1)}
      />
      <InputNumber
        value={props.quantity}
        onChange={e => props.setQuantity(e.value ?? 0)}
        inputClassName={Styles.inputNumber}
        min={0}
        max={999}
      />
      <Button
        rounded
        className={Styles.increaseButton}
        icon="fa-solid fa-plus"
        onClick={() => props.setQuantity(props.quantity + 1)}
      />
    </div>
  );
};
