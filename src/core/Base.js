import React from "react";
import Menu from "./Menu";
import "../style.css";
import { Bstyle } from "./style/base.css";

const Base = ({ className = "bg-dark text-white p-4", children }) => (
  <div>
    <Menu />

    <div className={className}>{children}</div>
  </div>
);

export default Base;
