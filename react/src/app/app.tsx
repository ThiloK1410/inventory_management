import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Deliveries } from "./deliveries/deliveries";
import { Inventory } from "./inventory/inventory";
import NavBar from "./nav-bar/nav-bar";
import { Statistics } from "./statistics/statistics";

const navBarItems = [
  { to: "/", title: "Inventory" },
  { to: "/statistics", title: "Statistics" },
  { to: "/deliveries", title: "Deliveries" },
];

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <NavBar items={navBarItems} />
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="deliveries/*" element={<Deliveries />} />
      </Routes>
    </BrowserRouter>
  );
};
