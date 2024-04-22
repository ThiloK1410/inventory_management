import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../constants";
import { BrandDelivery } from "../../../../types/brand-delivery";
import { InventoryItem } from "../../../../types/inventory-item";
import { MissingId } from "../../../../types/missing-id";
import Styles from "./brand-delivery-creator.module.css";

type BrandDeliveryCreatorProps = {
  onCreate: (brandDelivery: MissingId<BrandDelivery>) => void;
};

export const BrandDeliveryCreator: React.FunctionComponent<BrandDeliveryCreatorProps> = props => {
  const [showModal, setShowModal] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [brandDelivery, setBrandDelivery] = useState<Partial<BrandDelivery>>({});

  useEffect(() => {
    axios.get(API_URL + "/brand/").then(response => setInventoryItems(response.data));
  }, []);

  const onCrateAmountChange = (e: InputNumberChangeEvent) => {
    if (e.value === null) return;
    setBrandDelivery(current => ({ ...current, crate_amount: e.value! }));
  };

  const onBrandSelect = (e: DropdownChangeEvent) => {
    setBrandDelivery(current => ({ ...current, brand: e.value }));
  };

  const onAddCrate = () => {
    if (brandDelivery.brand === undefined || brandDelivery.crate_amount === undefined) return;
    setShowModal(false);
    props.onCreate({ crate_amount: brandDelivery.crate_amount, brand: brandDelivery.brand });
  };

  if (showModal)
    return (
      <>
        <div className={`${Styles.modal} item-card`}>
          <h1>Add crate</h1>
          <div className={Styles.inputs}>
            <InputNumber
              onChange={onCrateAmountChange}
              value={brandDelivery.crate_amount}
              placeholder="Crates"
            />
            <Dropdown
              className={Styles.dropdown}
              placeholder="Select brand"
              options={inventoryItems}
              optionLabel="name"
              onChange={onBrandSelect}
              value={brandDelivery.brand}
            />
          </div>
          <div className={Styles.bottomButtons}>
            <Button
              onClick={() => setShowModal(false)}
              severity="secondary"
              className=""
              icon="fas fa-times"
            >
              Cancel
            </Button>
            <Button onClick={onAddCrate} icon="fas fa-check">
              Add
            </Button>
          </div>
        </div>
        <div onClick={() => setShowModal(false)} className={Styles.background} />
      </>
    );

  return <Button onClick={() => setShowModal(true)}>Add crate</Button>;
};

export default BrandDeliveryCreator;
