import React, { useState } from "react";
import { QuantityInput } from "../change-value-button/quantity-input";
import Styles from "./item-card.module.css";

type ItemCardProps = {
  brandName: string;
  bottleSize: number;
  crateSize?: number;
  quantity: number;
  setQuantity: (value: number) => void;
  inFocus: boolean;
  setInFocus: () => void;
};

export const ItemCard: React.FunctionComponent<ItemCardProps> = props => {
  const details = `${props.bottleSize} x ${props.crateSize}`;

  return (
    <>
      <div
        onClick={props.setInFocus}
        className={props.inFocus ? Styles.itemCardExpanded : Styles.itemCardCollapsed}
      >
        <div className={Styles.label}>
          <span className={Styles.brand}>{props.brandName}</span>
          <span className={Styles.details}>{details}</span>
        </div>
        {props.inFocus && <QuantityInput quantity={props.quantity} setQuantity={props.setQuantity} />}
        <div className={Styles.quantity}>{props.quantity}</div>
      </div>
    </>
  );
};
