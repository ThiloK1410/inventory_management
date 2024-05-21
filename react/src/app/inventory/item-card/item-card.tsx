import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
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

  const dirty = props.item.bottle_amount != props.item.previousAmount;

  const crateAmount = props.item.crate_size
    ? Math.floor(props.item.bottle_amount / props.item.crate_size)
    : undefined;

  const bottleSurplus = props.item.crate_size
    ? props.item.bottle_amount % props.item.crate_size
    : props.item.bottle_amount;

  const [upForDeletion, setUpForDeletion] = useState(false);

  useEffect(() => {
    if (props.expanded || !upForDeletion) return;
    setTimeout(() => setUpForDeletion(false), 500);
  }, [props.expanded]);

  const tryDeletion = () => {
    if (!upForDeletion) return setUpForDeletion(true);
    props.onDelete();
  };

  return (
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
        <div className={Styles.quantityControl}>
          {crateAmount !== undefined && (
            <div className={Styles.labelBox}>
              <label>Crates</label>
              <QuantityInput
                decrementDisabled={props.item.bottle_amount - props.item.crate_size! < 0}
                incrementDisabled={crateAmount === 999}
                quantity={crateAmount}
                setQuantity={quantity =>
                  props.setQuantity(quantity * props.item.crate_size! + bottleSurplus)
                }
                min={0}
                max={999}
              />
            </div>
          )}
          <div className={Styles.labelBox}>
            <label>Bottles</label>
            <QuantityInput
              decrementDisabled={props.item.bottle_amount === 0}
              incrementDisabled={
                props.item.crate_size
                  ? crateAmount === 999 && bottleSurplus === props.item.crate_size - 1
                  : bottleSurplus === 999
              }
              quantity={bottleSurplus}
              setQuantity={quantity =>
                props.setQuantity((crateAmount ?? 0) * (props.item.crate_size ?? 0) + quantity)
              }
              min={0}
              max={props.item.crate_size ? props.item.crate_size - 1 : 999}
            />
          </div>
        </div>
        <div className={Styles.buttons}>
          <Button
            outlined
            rounded
            onClick={props.onCancel}
            className={Styles.cancelButton}
            disabled={!dirty}
          >
            Reset
          </Button>
          <Button
            className={[Styles.deleteButton, upForDeletion ? Styles.upForDeletion : ""].join(" ")}
            rounded
            onClick={tryDeletion}
            severity="danger"
            icon={!upForDeletion && "fa-regular fa-trash-can"}
          >
            {upForDeletion && <span>Delete</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
