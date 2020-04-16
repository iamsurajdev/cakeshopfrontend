import React from "react";
import "../style.css";
import Base from "./Base";
import { isAuthenticated } from "../auth/api/Authentication";

export default function Home() {
  // console.log(isAuthenticated());

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of Product</h1>
      </div>
    </Base>
  );
}
