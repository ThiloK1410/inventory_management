import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import React from "react";

type QuantityInputProps = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export const QuantityInput: React.FunctionComponent<QuantityInputProps> = props => {
  return (
    <InputNumber
      value={props.quantity}
      onValueChange={(e: InputNumberValueChangeEvent) => props.setQuantity(e.value ?? 0)}
      decrementButtonClassName="p-button-danger"
      incrementButtonClassName="p-button-success"
      showButtons
      buttonLayout="horizontal"
      incrementButtonIcon="fas fa-plus"
      decrementButtonIcon="fas fa-minus"
      mode="decimal"
    />
  );
};
