import React from "react";
import { Outlet, Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div
      className={
        props.isActiveSidebar === true
          ? "col-md-3 sidebr_main_box"
          : "col_md_per sidebr_main_box"
      }
    >
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
