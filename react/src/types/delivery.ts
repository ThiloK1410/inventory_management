import { BrandDelivery } from "./brand-delivery";
import { Transaction } from "./transaction";

export type Delivery = {
  id: number;
  cost: Transaction;
  brand_deliveries: BrandDelivery[];
  date: string;
};
