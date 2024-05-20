import { ToastMessage } from "primereact/toast";
import { createContext } from "react";

export const ToastContext = createContext<(message: ToastMessage) => void>(() => {});
