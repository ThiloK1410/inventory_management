import { Button } from "primereact/button";
import React from "react";
import { QuantityInput } from "../../../components/quantity-input/quantity-input";
import Styles from "./item-card.module.css";

type ItemCardProps = {
  brandName: string;
  bottleSize: number;
  crateSize?: number;
  quantity: number;
  setQuantity: (value: number) => void;
  expanded: boolean;
  setInFocus: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

export const ItemCard: React.FunctionComponent<ItemCardProps> = props => {
  const details = `${props.bottleSize} x ${props.crateSize}`;

  return (
    <>
      <div
        onClick={props.setInFocus}
        className={[Styles.itemCard, props.expanded ? Styles.expanded : ""].join(" ")}
      >
        <div className={Styles.header}>
          <div className={Styles.label}>
            <span className={Styles.brand}>{props.brandName}</span>
            <span className={Styles.itemDetails}>{details}</span>
          </div>
          <div className={Styles.quantity}>{props.quantity}</div>
        </div>
        <div className={Styles.cardControls}>
          <div>
            <QuantityInput quantity={props.quantity} setQuantity={props.setQuantity} />
          </div>
          <div className={Styles.buttons}>
            <Button onClick={props.onCancel} className={Styles.cancelButton}>
              Cancel
            </Button>
            <Button onClick={props.onDelete} severity="danger" icon="fa-regular fa-trash-can" />
          </div>
        </div>
      </div>
    </>
  );
};
