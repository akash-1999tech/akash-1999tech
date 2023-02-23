import React, { useState } from "react";

const UserDetails = (props) => {
  console.log(props);
  return (
    <div className="user_details_box">
      <div>
        <h2>User Details:</h2>
      </div>
      <div>
        <span>User Name:</span>{" "}
        <span>
          <b>{props.userName}</b>
        </span>
      </div>
      <div>
        <span>Password:</span>{" "}
        <span>
          <b>{props.userPassword}</b>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;
