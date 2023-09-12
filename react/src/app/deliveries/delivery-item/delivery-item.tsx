import React from "react";
import { Delivery } from "../../../types/delivery";
import Styles from "./delivery-item.module.css";

type DeliveryItemProps = {
  delivery: Delivery;
};

const brandNameFormatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

export const DeliveryItem: React.FunctionComponent<DeliveryItemProps> = props => {
  const brandNames = props.delivery.brand_deliveries.map(delivery => delivery.brand.name);

  return (
    <div className={Styles.itemCard}>
      <div className={Styles.summary}>{brandNameFormatter.format(brandNames)}</div>
      <div className={Styles.cost}>{props.delivery.cost.cash_amount}€</div>
    </div>
  );
};
