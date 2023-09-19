import axios, { AxiosError } from "axios";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuantityCard } from "../../../components/quantity-card/quantity-card";
import { API_URL } from "../../../constants";
import { BrandDelivery } from "../../../types/brand-delivery";
import { Delivery } from "../../../types/delivery";
import { InvalidFields } from "../../../types/invalid-fields";
import { MissingId } from "../../../types/missing-id";
import { Transaction } from "../../../types/transaction";
import BrandDeliveryCreator from "./brand-delivery-creator/brand-delivery-creator";
import Styles from "./delivery-editor.module.css";

type UnpersistedDelivery = {
  cost: Partial<Transaction>;
  brand_deliveries: MissingId<BrandDelivery>[];
};

const BASE_DELIVERY: UnpersistedDelivery = {
  cost: {},
  brand_deliveries: [],
};

export const DeliveryEditor: React.FunctionComponent = () => {
  const [delivery, setDelivery] = useState<UnpersistedDelivery>(BASE_DELIVERY);
  const [creating, setCreating] = useState(false);
  const [invalidFields, setInvalidFields] = useState<InvalidFields<Delivery>>();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const deleteDelivery = (indexToDelete: number) => {
    setDelivery(current => ({
      ...current,
      brand_deliveries: current.brand_deliveries.filter((_, index) => index !== indexToDelete),
    }));
  };

  const onTransactionChange = <K extends keyof Transaction>(
    key: K,
    value?: Transaction[K],
  ): void => {
    setDelivery(current => ({ ...current, cost: { ...current.cost, [key]: value } }));
  };

  const onCreate = () => {
    setCreating(true);
    axios
      .post(API_URL + "/delivery/create/", delivery)
      .then(() => navigate("/deliveries"))
      .catch((error: AxiosError) => {
        if (error.response) setInvalidFields(error.response.data as InvalidFields<Delivery>);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Could not create delivery.",
        });
      })
      .finally(() => setCreating(false));
  };

  const getBrandDeliveries = () => {
    return delivery.brand_deliveries.map((brandDelivery, index) => (
      <div className={Styles.brandDeliveryWrapper} key={brandDelivery.brand.name}>
        <QuantityCard
          text={brandDelivery.brand.name}
          detailText={`${brandDelivery.brand.bottle_size}L x ${brandDelivery.brand.bottles_per_crate}`}
          quantity={String(brandDelivery.crate_amount)}
        />
        <Button
          onClick={() => deleteDelivery(index)}
          className={Styles.deleteButton}
          icon="fas fa-times"
          rounded
          severity="danger"
        />
      </div>
    ));
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.topButtons}>
        <Button
          onClick={() => navigate("/deliveries")}
          severity="secondary"
          className=""
          icon="fas fa-times"
        >
          Back
        </Button>
        <Button disabled={creating} onClick={onCreate} icon="fas fa-check">
          Create
        </Button>
      </div>
      <div className={Styles.input}>
        {invalidFields?.non_field_errors && (
          <Message severity="error" text={invalidFields.non_field_errors.join(" ")} />
        )}
        <label htmlFor="input-cost">Cost</label>
        <InputNumber
          className={invalidFields?.cost?.cash_amount ? "p-invalid" : undefined}
          value={delivery.cost.cash_amount}
          onChange={e => onTransactionChange("cash_amount", e.value ?? undefined)}
          id="input-cost"
          min={0}
          minFractionDigits={0}
          maxFractionDigits={2}
        />
        {invalidFields?.cost?.cash_amount && (
          <small className={Styles.invalid}>{invalidFields.cost.cash_amount.join("")}</small>
        )}
      </div>
      <div className={Styles.input}>
        <label htmlFor="input-transaction-type">Transaction Type</label>
        <InputText
          className={invalidFields?.cost?.type ? "p-invalid" : undefined}
          value={delivery.cost.type}
          onChange={e => onTransactionChange("type", e.target.value)}
          id="input-transaction-type"
        />
        {invalidFields?.cost?.type && (
          <small className={Styles.invalid}>{invalidFields.cost.type.join(" ")}</small>
        )}
      </div>
      <BrandDeliveryCreator
        onCreate={brandDelivery =>
          setDelivery(current => ({
            ...current,
            brand_deliveries: [brandDelivery, ...current.brand_deliveries],
          }))
        }
      />
      {getBrandDeliveries()}
      <Toast ref={toast} />
    </div>
  );
};
