import { Button } from "primereact/button";
import React from "react";
import Styles from "./inventory-card.module.css";

type InventoryCardProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const InventoryCard: React.FunctionComponent<
  React.PropsWithChildren<InventoryCardProps>
> = props => (
  <div className={Styles.card}>
    {props.children}
    <div className={Styles.buttons}>
      <Button icon="fas fa-times" onClick={props.onCancel} />
      <Button icon="fas fa-check" onClick={props.onConfirm} />
    </div>
  </div>
);
