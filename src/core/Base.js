import React from "react";
import Menu from "./Menu";
import "../style.css";
import Bstyle from "./allstyles/base.module.css";
const Base = ({ children }) => (
  <div>
    <Menu />

    <div>{children}</div>
    <footer className={Bstyle.footer}>
      <div className={Bstyle.footerMainDiv}>
        <div className={Bstyle.footerGrid1}>
          <h2>About Us</h2>
          <p>
            is an initiative to help the upcoming programmers with the code.
            Scanfcode focuses on providing the most efficient code or snippets
            as the code wants to be simple. We will help programmers build up
            concepts in different programming languages that include C, C++,
            Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and
            Algorithm.
          </p>
        </div>
        <div className={Bstyle.footerGrid2}>
          <h2>Contact</h2>
          <p>
            <b>Mobile: </b> 00347297417
            <br />
            <b>E-mail: </b> cake@gmail.com <br />
            <b>Address: </b> G/6,Diamond City, Golden Tree Road, Kolkata-700069
          </p>
        </div>
        <div className={Bstyle.footerGrid3}>
          <h2>Quick Links</h2>
          <li>hh</li>
          <li>th</li>
          <li>rr</li>
          <li>ph</li>
        </div>
      </div>
      <div className={Bstyle.copyRight}>
        Copy Rights @ 2020 All Rights Received by Suraj Biswas
      </div>
    </footer>
  </div>
);

export default Base;
