import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./nav-bar.module.css";

type NavBarProps = {
  items: {
    to: string;
    title: string;
  }[];
};

const NavBar: React.FunctionComponent<NavBarProps> = props => {
  return (
    <nav className={Styles.navBackground}>
      {props.items.map(item => (
        <NavLink
          key={item.title}
          className={({ isActive }) => (isActive ? Styles.active : "")}
          to={item.to}
        >
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
