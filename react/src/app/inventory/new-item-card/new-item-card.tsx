import axios from "axios";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { API_URL } from "../../../constants";
import { InventoryCard } from "../inventory-card/inventory-card";
import Styles from "./new-item-card.module.css";

type NewItemCardProps = {
  onClose: () => void;
  onCreateItem: () => void;
}

export const NewItemCard: React.FunctionComponent<NewItemCardProps> = props => {
  const [brandName, setBrandName] = useState("");
  const [bottleSize, setBottleSize] = useState("");
  const [crateSize, setCrateSize] = useState("");

  const onConfirm = () => {
    const item = {
      brand_name: brandName,
      bottle_size: bottleSize,
      bottle_amount: 0,
      crate_size: crateSize,
    };
    
    axios
      .post(API_URL + "/inventory/", item)
      .then(() => props.onCreateItem());
  };

  return (
    <InventoryCard onCancel={props.onClose} onConfirm={onConfirm}>
      <div className={Styles.container}>
        <span className={Styles.title}>Create new inventory item</span>
        <label>Brand name</label>
        <InputText value={brandName} onChange={e => setBrandName(e.target.value)} />
        <label>Bottle size</label>
        <InputText value={bottleSize} onChange={e => setBottleSize(e.target.value)} />
        <label>Crate size</label>
        <InputText value={crateSize} onChange={e => setCrateSize(e.target.value)} />
      </div>
    </InventoryCard>
  );
};
