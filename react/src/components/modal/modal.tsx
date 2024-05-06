import React, { PropsWithChildren } from "react";

import Styles from "./modal.module.css";

export const Modal: React.FunctionComponent<PropsWithChildren> = props => (
  <>
    <div className={Styles.modal}>
      {props.children}
    </div>
    <div className={Styles.background}>
      <div />
    </div>
  </>
);
