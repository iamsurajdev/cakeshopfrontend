import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/api/Authentication";
import Ustyle from "./allStyle/uDashboard.module.css";

const UserDashBoard = () => {
  const { user } = isAuthenticated();
  return (
    <Base>
      <div className={Ustyle.container}>
        <h1 className={Ustyle.dBoardHeading}>User DashBoard</h1>
        <div className={Ustyle.informationContainer}>
          <h2>User information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
