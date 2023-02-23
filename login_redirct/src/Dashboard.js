import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Logout from "./logout";
import TableData from "./Tabledata";
import MenuButton from "./MenuButton";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <p className="main_heading">Welcome to your Dashboard</p>
        <Logout />
        <MenuButton />
        <div>
          <TableData />
        </div>
      </div>
    );
  }
};

export default Dashboard;
