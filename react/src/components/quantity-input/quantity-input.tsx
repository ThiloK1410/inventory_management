import { Button } from "primereact/button";
import React from "react";
import Styles from "./quantity-input.module.css";
import { InputNumber } from "primereact/inputnumber";

type QuantityInputProps = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export const QuantityInput: React.FunctionComponent<QuantityInputProps> = props => {
  return (
    <div className={Styles.quantityInput}>
      <Button
        rounded
        className={Styles.decreaseButton}
        icon="fa-solid fa-minus"
        onClick={() =>
          props.setQuantity(props.quantity <= 0 ? (props.quantity = 0) : props.quantity - 1)
        }
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
        onClick={() =>
          props.setQuantity(props.quantity < 999 ? props.quantity + 1 : (props.quantity = 999))
        }
      />
    </div>
  );
};
