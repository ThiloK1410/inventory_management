import { InventoryItem } from "./inventory-item";

export type BrandDelivery = {
  id: number;
  crate_amount: number;
  brand: InventoryItem;
};
