import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Styles from "./nav-dropdown.module.css";

type NavDropdownProps = {
  items: {
    to: string;
    title: string;
  }[];
};

const NavDropdown: React.FunctionComponent<NavDropdownProps> = props => {
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={Styles.navDropdownContainer}>
      <Dropdown
        panelClassName={Styles.navPanel}
        className={dropdownOpen?Styles.navDropdownOpen:Styles.navDropdown}
        value={location.pathname}
        options={props.items}
        optionValue="to"
        optionLabel="title"
        itemTemplate={option => (
          <NavLink className={Styles.navLink} to={option.to}>
            {option.title}
          </NavLink>
        )}
        onClick={()=>setDropdownOpen(current => !current)}
      />
    </div>
  );
};

export default NavDropdown;
