// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Deliveries } from "./deliveries/deliveries";
import { Inventory } from "./inventory/inventory";
// import { NotFound } from "./not-found/not-found";
// import { Statistics } from "./statistics/statistics";

import Styles from "./app.module.css";

// const navBarItems = [
//   { to: "/", title: "Inventory" },
//   { to: "/statistics", title: "Statistics" },
//   { to: "/deliveries", title: "Deliveries" },
// ];

export const App: React.FunctionComponent = () => {
  return (
    <div className={Styles.main}>
      <h1 className={Styles.title}>Inventory</h1>
      <Inventory />
      {/* <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Inventory />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="deliveries/*" element={<Deliveries />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
};
