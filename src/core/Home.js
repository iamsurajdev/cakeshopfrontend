import React from "react";
import Base from "./Base";

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
