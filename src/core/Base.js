import React from "react";
import Menu from "./Menu";
import "../style.css";
import Bstyle from "./allstyles/base.module.css";
const Base = ({ children }) => (
  <div>
    <Menu />

    <div>{children}</div>
    <footer className={Bstyle.f}>
      <h1>Hello this is footer...!</h1>
    </footer>
  </div>
);

export default Base;
