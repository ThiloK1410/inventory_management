export type InventoryItem = {
  id: number;
  brand_name: string;
  bottle_amount: number;
  bottle_size: number;
  crate_size?: number;
  previousAmount: number;
}
