import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Modal } from "../../../components/modal/modal";
import { API_URL } from "../../../constants";
import { ModalItemCard } from "../modal-item-card/modal-item-card";
import Styles from "./create-item-modal.module.css";

type NewItemCardProps = {
  onCreateItem: () => void;
};

export const CreateItemModal: React.FunctionComponent<NewItemCardProps> = props => {
  const [brandName, setBrandName] = useState("");
  const [bottleSize, setBottleSize] = useState("");
  const [crateSize, setCrateSize] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const onConfirm = () => {
    const item = {
      brand_name: brandName,
      bottle_size: bottleSize,
      bottle_amount: 0,
      crate_size: crateSize === "" ? undefined : crateSize,
    };

    axios.post(API_URL + "/inventory/", item).then(() => {
      props.onCreateItem();
      setShowDialog(false);
    });
  };

  if (!showDialog) {
    return (
      <Button
        className={Styles.newButton}
        icon="fas fa-plus"
        outlined
        onClick={() => setShowDialog(true)}
      />
    );
  }

  return (
    <Modal>
      <ModalItemCard onCancel={() => setShowDialog(false)} onConfirm={onConfirm}>
        <div className={Styles.container}>
          <span className={Styles.title}>Create new inventory item</span>
          <label>Brand name *</label>
          <InputText value={brandName} onChange={e => setBrandName(e.target.value)} />
          <label>Bottle size *</label>
          <InputText value={bottleSize} onChange={e => setBottleSize(e.target.value)} />
          <label>Crate size</label>
          <InputText
            placeholder="Leave empty for loose bottles"
            keyfilter="pint"
            value={crateSize}
            onChange={e => setCrateSize(e.target.value)}
          />
        </div>
      </ModalItemCard>
    </Modal>
  );
};
