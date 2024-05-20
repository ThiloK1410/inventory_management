import axios, { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { InventoryItem } from "../../types/inventory-item";
import { ToastContext } from "../toast-context";
import Styles from "./inventory.module.css";
import { ItemCard } from "./item-card/item-card";
import { NewItemCard } from "./new-item-card/new-item-card";

export const Inventory: React.FunctionComponent = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [focusedItemId, setFocusedItemId] = useState<number | undefined | "new">();

  const showToast = useContext(ToastContext);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(API_URL + "/inventory/")
      .then((response: AxiosResponse<InventoryItem[]>) =>
        setItems(response.data.map(item => ({ ...item, previousAmount: item.bottle_amount }))),
      );
  };

  const deleteItem = (toDelete: InventoryItem) => {
    axios.delete(API_URL + "/inventory/" + toDelete.id + "/").then(() => {
      setItems(items => items.filter(item => item.id !== toDelete.id));
      showToast({ severity: "info", summary: `${toDelete.brand_name} was deleted` });
    });
  };

  const cancelItem = (toCancel: InventoryItem) => {
    setItems(items =>
      items.map(item => {
        if (item.id !== toCancel.id) return item;

        return { ...item, bottle_amount: item.previousAmount };
      }),
    );
  };

  const saveItems = () => {
    axios.put(API_URL + "/inventory/", items).then(() => {
      showToast({ severity: "info", summary: "Changes saved" });
      setItems(items => items.map(item => ({ ...item, previousAmount: item.bottle_amount })));
    });
  };

  const onUnfocusClick = () => {
    setFocusedItemId(undefined);
  };

  const onCreateItem = () => {
    fetchItems();
    setFocusedItemId(undefined);
  };

  const dirty = items.find(item => item.bottle_amount !== item.previousAmount) !== undefined;

  return (
    <>
      <div className={Styles.items}>
        {items.map(item => (
          <ItemCard
            key={item.id}
            brandName={item.brand_name}
            bottleSize={item.bottle_size}
            quantity={item.bottle_amount}
            crateSize={item.crate_size}
            setInFocus={() => setFocusedItemId(item.id)}
            expanded={focusedItemId == item.id}
            setQuantity={quantity =>
              setItems(current =>
                current.map(item1 => {
                  if (item1.id !== item.id) return item1;
                  return {
                    ...item1,
                    bottle_amount: quantity,
                  };
                }),
              )
            }
            onDelete={() => deleteItem(item)}
            onCancel={() => cancelItem(item)}
          />
        ))}
        <NewItemCard onCreateItem={onCreateItem} />
      </div>
      {focusedItemId && <div className={Styles.unfocus} onClick={onUnfocusClick} />}
      {dirty && (
        <Button className={Styles.saveButton} onClick={saveItems}>
          Save
        </Button>
      )}
    </>
  );
};
