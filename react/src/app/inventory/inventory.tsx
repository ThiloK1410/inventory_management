import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { InventoryItem } from "../../types/inventory-item";
import Styles from "./inventory.module.css";
import { ItemCard } from "./item-card/item-card";
import { NewItemCard } from "./new-item-card/new-item-card";

export const Inventory: React.FunctionComponent = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [focusedItemId, setFocusedItemId] = useState<number | undefined | "new">();
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(API_URL + "/inventory/").then(response => setItems(response.data));
  };

  const saveItems = () => {
    axios.post(API_URL + "/inventory/", items);
  };

  const showNewItem = () => {
    setFocusedItemId("new");
  };

  const onUnfocusClick = () => {
    setFocusedItemId(undefined);
  };

  const onCreateItem = () => {
    fetchItems();
    setFocusedItemId(undefined);
  };

  return (
    <>
      <div className={Styles.items}>
        {focusedItemId === "new" && (
          <NewItemCard onClose={() => setFocusedItemId(undefined)} onCreateItem={onCreateItem} />
        )}
        {items.map(item => (
          <ItemCard
            key={item.id}
            brandName={item.brand_name}
            bottleSize={item.bottle_size}
            quantity={item.bottle_amount}
            crateSize={item.crate_size}
            setInFocus={() => setFocusedItemId(item.id)}
            inFocus={focusedItemId == item.id}
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
            Save
          </Button>
        )}
      </div>
      {focusedItemId && <div className={Styles.unfocus} onClick={onUnfocusClick} />}
      <Button className={Styles.createButton} icon="fas fa-plus" rounded onClick={showNewItem} />
    </>
  );
};
