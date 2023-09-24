import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuantityCard } from "../../components/quantity-card/quantity-card";
import { API_URL } from "../../constants";
import { InventoryItem } from "../../types/inventory-item";
import Styles from "./inventory.module.css";

export const Inventory: React.FunctionComponent = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    axios.get(API_URL + "/inventory/").then(response => setItems(response.data));
  }, []);

  return (
    <div className={Styles.items}>
      {items.map(item => (
        <QuantityCard
          key={item.id}
          text={item.brand.name}
          detailText={`${item.brand.bottle_size}L`}
          quantity={`${item.bottle_amount} bottles`}
        />))}
    </div>
  );
};
