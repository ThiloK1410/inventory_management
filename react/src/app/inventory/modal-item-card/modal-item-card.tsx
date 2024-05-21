import { Button } from "primereact/button";
import React from "react";
import Styles from "./modal-item-card.module.css";

type InventoryCardProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const ModalItemCard: React.FunctionComponent<
  React.PropsWithChildren<InventoryCardProps>
> = props => (
  <div className={Styles.card}>
    {props.children}
    <div className={Styles.buttons}>
      <Button outlined icon="fas fa-times" onClick={props.onCancel} />
      <Button icon="fas fa-check" onClick={props.onConfirm} />
    </div>
  </div>
);
