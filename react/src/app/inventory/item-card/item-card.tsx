import { Button } from "primereact/button";
import React from "react";
import { QuantityInput } from "../../../components/quantity-input/quantity-input";
import { InventoryItem } from "../../../types/inventory-item";
import Styles from "./item-card.module.css";

type ItemCardProps = {
  item: InventoryItem;
  setQuantity: (value: number) => void;
  expanded: boolean;
  setInFocus: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

export const ItemCard: React.FunctionComponent<ItemCardProps> = props => {
  const details = `${props.item.bottle_size} x ${props.item.crate_size}`;

  return (
    <>
      <div
        onClick={props.setInFocus}
        className={[
          Styles.itemCard,
          props.expanded ? Styles.expanded : "",
          props.item.deleted ? Styles.deleted : "",
        ].join(" ")}
      >
        <div className={Styles.header}>
          <div className={Styles.label}>
            <span className={Styles.brand}>{props.item.brand_name}</span>
            <span className={Styles.itemDetails}>{details}</span>
          </div>
          <div className={Styles.quantity}>{props.item.bottle_amount}</div>
        </div>
        <div className={Styles.cardControls}>
          <div>
            <QuantityInput quantity={props.item.bottle_amount} setQuantity={props.setQuantity} />
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
