import React from "react";
import { Route, Routes } from "react-router-dom";
import { DeliveriesOverview } from "./deliveries-overview/deliveries-overview";
import { DeliveryEditor } from "./delivery-editor/delivery-editor";

export const Deliveries: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<DeliveriesOverview />} />
      <Route path="/create" element={<DeliveryEditor />} />
    </Routes>
  );
};
