import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuantityCard } from "../../../components/quantity-card/quantity-card";
import { API_URL } from "../../../constants";
import { Delivery } from "../../../types/delivery";
import Styles from "./deliveries-overview.module.css";

const brandNameFormatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "short", timeStyle: "short" });

export const DeliveriesOverview: React.FunctionComponent = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    axios.get(API_URL + "/delivery/").then(response => setDeliveries(response.data));
  }, []);

  const getDelivery = (delivery: Delivery) => {
    const brandNames = delivery.brand_deliveries.map(brandDelivery => brandDelivery.brand.name);

    return (
      <QuantityCard
        key={delivery.id}
        text={dateFormatter.format(new Date(delivery.date))}
        detailText={brandNameFormatter.format(brandNames)}
        quantity={delivery.cost.cash_amount}
        unit="€"
      />
    );
  };

  return (
    <div className={Styles.deliveries}>
      <Link to="create" className={Styles.link}>
        <Button>Create new delivery</Button>
      </Link>
      {deliveries.map(delivery => getDelivery(delivery))}
    </div>
  );
};
