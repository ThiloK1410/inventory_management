import axios, { AxiosResponse } from "axios"; 
import React, { useContext, useEffect, useState } from "react";
import Styles from "./fridge-item-card.module.css";
import { InventoryItem } from "../../../types/inventory-item";

type FridgeItemCardProps = {
    item: InventoryItem;
    quantityInCart: number;
}

export const FridgeItemCard: React.FunctionComponent<FridgeItemCardProps> = props => {
    return <></>
}