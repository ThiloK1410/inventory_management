import React from "react";
import { QuantityInput } from "../../../components/change-value-button/quantity-input";
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
        className={[Styles.itemCard, props.inFocus ? Styles.expanded : ""].join(" ")}
      >
        <div className={Styles.header}>
          <div className={Styles.label}>
            <span className={Styles.brand}>{props.brandName}</span>
            <span className={Styles.details}>{details}</span>
          </div>
          <div className={Styles.quantity}>{props.quantity}</div>
        </div>
        {props.inFocus && (
          <div>
            <QuantityInput quantity={props.quantity} setQuantity={props.setQuantity} />
          </div>
        )}
      </div>
    </>
  );
};
