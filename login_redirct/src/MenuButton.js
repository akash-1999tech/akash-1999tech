import React, { useState } from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import Sidebar from "./Sidebar";

const MenuButton = (props) => {
  const [isActiveSidebar, setIsActiveSidebar] = useState(false);

  const handleSidebarActiveMenu = (e) => {
    setIsActiveSidebar(!isActiveSidebar);
  };
  return (
    <>
      <button
        type="button"
        className="menu_btn"
        onClick={handleSidebarActiveMenu}
      >
        {isActiveSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
      </button>
      <div>
        <Sidebar isActiveSidebar={isActiveSidebar} />
      </div>
    </>
  );
};

export default MenuButton;
