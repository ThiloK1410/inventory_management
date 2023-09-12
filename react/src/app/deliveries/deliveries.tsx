import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { Delivery } from "../../types/delivery";
import { DeliveryItem } from "./delivery-item/delivery-item";
import Styles from "./deliveries.module.css";

export const Deliveries: React.FunctionComponent = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    axios.get(API_URL + "/delivery/").then(response => setDeliveries(response.data));
  }, []);

  return (
    <div className={Styles.deliveries}>
      {deliveries.map(delivery => (
        <DeliveryItem key={delivery.id} delivery={delivery} />
      ))}
    </div>
  );
};
