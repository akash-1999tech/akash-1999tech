import React, { useState } from "react";
import UserDetails from "./UserDetails";
import UserSignIn from "./UserSignIn";

const Tab = () => {
  const [isActiveTab, setIsActiveTab] = useState("tab1");
  const [userName, setUserName] = useState(localStorage.getItem("Username"));
  const [userPassword, setUserPassword] = useState(
    localStorage.getItem("Password")
  );

  const handleTab1 = () => {
    setIsActiveTab("tab1");
  };
  const handleTab2 = () => {
    setIsActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={isActiveTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          User Details
        </li>
        <li
          className={isActiveTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          User SignIn
        </li>
      </ul>
      <div className="outlet">
        {isActiveTab === "tab1" ? (
          <UserDetails userName={userName} userPassword={userPassword} />
        ) : (
          <UserSignIn />
        )}
      </div>
    </div>
  );
};

export default Tab;
