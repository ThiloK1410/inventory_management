import { Button } from "primereact/button";
import React from "react";
import { QuantityInput } from "../../../components/quantity-input/quantity-input";
import { InventoryItem } from "../../../types/inventory-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./item-card.module.css";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

type ItemCardProps = {
  item: InventoryItem;
  setQuantity: (value: number) => void;
  expanded: boolean;
  setInFocus: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

export const ItemCard: React.FunctionComponent<ItemCardProps> = props => {
  const details = `${
    Number.isInteger(props.item.bottle_size)
      ? props.item.bottle_size.toFixed(1)
      : props.item.bottle_size
  }L x ${props.item.crate_size}`;

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

          <div className={Styles.quantity}>
            <span>
              {props.item.bottle_amount !== props.item.previousAmount && props.item.previousAmount}
            </span>
            <span>
              {props.item.bottle_amount !== props.item.previousAmount && (
                <FontAwesomeIcon
                  className={
                    props.item.bottle_amount > props.item.previousAmount
                      ? Styles.increaseCaret
                      : Styles.decreaseCaret
                  }
                  icon={faCaretRight}
                />
              )}
            </span>
            <span>{props.item.bottle_amount}</span>
          </div>
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
