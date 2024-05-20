import { Toast, ToastMessage } from "primereact/toast";
import { useRef } from "react";
import Styles from "./app.module.css";
import { Inventory } from "./inventory/inventory";
import { ToastContext } from "./toast-context";

export const App: React.FunctionComponent = () => {
  const toast = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    toast.current?.show(message);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <div className={Styles.main}>
        <h1 className={Styles.title}>Inventory</h1>
        <Inventory />
      </div>
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
