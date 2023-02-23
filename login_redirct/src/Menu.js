import React from "react";
import Logout from "./logout";
import MenuButton from "./MenuButton";
import Tab from "./Tab";

const Menu = () => {
  return (
    <div>
      <MenuButton />
      <Logout />
      <Tab />
    </div>
  );
};

export default Menu;
