import axios from "axios";
import React, { useEffect, useState } from "react";
import { QuantityCard } from "../../components/quantity-card/quantity-card";
import { API_URL } from "../../constants";
import { InventoryItem } from "../../types/inventory-item";
import Styles from "./inventory.module.css";
import { Button } from "primereact/button";
import { ItemCard } from "../../components/item-card/item-card";
import { QuantityInput } from "../../components/change-value-button/quantity-input";

export const Inventory: React.FunctionComponent = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    axios.get(API_URL + "/inventory/").then(response => setItems(response.data));
  }, []);

  const saveItems = () => {
    axios.post(API_URL + "/inventory/", items);
  };

  return (
    <div className={Styles.items}>
      <ItemCard 
        key="0"
        brandName="Coca Cola"
        bottleSize={0.33}
        crateSize={24}
        quantity={24}
        setQuantity={quantity => quantity}
         />
      {items.map(item => (
        <QuantityCard
          key={item.id}
          text={item.brand.name}
          detailText={`${item.brand.bottle_size}L`}
          quantity={item.bottle_amount}
          unit="bottles"
          setQuantity={quantity =>
            setItems(current =>
              current.map(item1 => {
                setDirty(true);
                if (item1.id !== item.id) return item1;
                return {
                  ...item1,
                  bottle_amount: quantity,
                };
              }),
            )
          }
        />
      ))}
      {dirty && (
        <Button onClick={saveItems} icon="fas fa-check">
          Save Changes
        </Button>
      )}
    </div>
  );
};
