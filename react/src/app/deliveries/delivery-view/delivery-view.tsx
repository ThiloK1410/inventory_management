import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuantityCard } from "../../../components/quantity-card/quantity-card";
import { API_URL } from "../../../constants";
import { Delivery } from "../../../types/delivery";
import Styles from "./delivery-view.module.css";

export const DeliveryView: React.FunctionComponent = () => {
  const [delivery, setDelivery] = useState<Delivery>();
  const { deliveryId } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/delivery/${deliveryId}/`).then(response => setDelivery(response.data));
  }, [deliveryId]);

  if (!delivery) return "Loading...";

  return (
    <div className={Styles.container}>
      {delivery.brand_deliveries.map(brandDelivery => (
        <QuantityCard
          text={brandDelivery.brand.name}
          detailText={`${brandDelivery.brand.bottle_size}L x ${brandDelivery.brand.bottles_per_crate}`}
          quantity={String(brandDelivery.crate_amount)}
        />
      ))}
    </div>
  );
};
