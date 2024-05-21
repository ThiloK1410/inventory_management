import { Button } from "primereact/button";
import React from "react";
import Styles from "./quantity-input.module.css";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";

type QuantityInputProps = {
  quantity: number;
  decrementDisabled: boolean;
  incrementDisabled: boolean;
  setQuantity: (value: number) => void;
  min?: number;
  max?: number;
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
        onValueChange={(e: InputNumberValueChangeEvent) => props.setQuantity(e.value ?? 0)}
        inputClassName={Styles.inputNumber}
        min={props.min}
        max={props.max}
      />
      <Button
        rounded
        disabled={props.incrementDisabled}
        className={Styles.increaseButton}
        icon="fa-solid fa-plus"
        onClick={() => props.setQuantity(props.quantity + 1)}
      />
    </div>
  );
};
