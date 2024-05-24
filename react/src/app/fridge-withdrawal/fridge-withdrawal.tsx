import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./fridge-withdrawal.module.css";
import { InventoryItem } from "../../types/inventory-item";
import { FridgeItemCard } from "./fridge-item-card/fridge-item-card";

export const FridgeWithdrawal: React.FunctionComponent = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  return (
    <>
      <h1 className={Styles.title}>Select your drinks</h1>
      {items.map(item => (
          <FridgeItemCard
            key={item.id}
            item={item}
            quantityInCart={0}
          />
        ))}
    </>
);};
