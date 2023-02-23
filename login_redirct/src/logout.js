import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  function handleLogout() {
    if (authenticated) {
      localStorage.removeItem("authenticated");
      window.location.href = "/login";
    }
  }
  return (
    <div>
      {" "}
      <button
        type="button"
        onClick={handleLogout}
        className="btn btn-primary log_out_btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
