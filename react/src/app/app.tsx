import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Deliveries } from "./deliveries/deliveries";
import { Inventory } from "./inventory/inventory";
import NavBar from "./nav-bar/nav-bar";
import { NotFound } from "./not-found/not-found";
import { Statistics } from "./statistics/statistics";
import { Dropdown } from "primereact/dropdown";

const navBarItems = [
  { to: "/", title: "Inventory" },
  { to: "/statistics", title: "Statistics" },
  { to: "/deliveries", title: "Deliveries" },
];

let selectedNavBarItem = undefined;

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      {/* <NavBar items={navBarItems} /> */}
      <h1>Inventory</h1>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Inventory />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="deliveries/*" element={<Deliveries />} />
      </Routes>
    </BrowserRouter>
  );
};
