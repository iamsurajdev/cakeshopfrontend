import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth/api/Authentication";
import Mstyle from "./allstyles/menu.module.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#b33d3d" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div className={Mstyle.navbar}>
    <div className={Mstyle.icon}>
      <Link className={Mstyle.iconLink} to="/">
        Cakes
      </Link>
    </div>
    <ul className={Mstyle.navlist}>
      {isAuthenticated() && (
        <li className={Mstyle.navItem}>
          <span
            className={Mstyle.link}
            onClick={() => {
              logout(() => {
                history.push("/");
              });
            }}
          >
            logout
          </span>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className={Mstyle.navItem}>
          <Link
            style={currentTab(history, "/user/dashboard")}
            className={Mstyle.link}
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && (
        <li className={Mstyle.navItem}>
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className={Mstyle.link}
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className={Mstyle.navItem}>
            <Link
              style={currentTab(history, "/signin")}
              className={Mstyle.link}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className={Mstyle.navItem}>
            <Link
              style={currentTab(history, "/signup")}
              className={Mstyle.link}
              to="/register"
            >
              Register
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className={Mstyle.navItem}>
          <Link
            style={currentTab(history, "/cart")}
            className={Mstyle.link}
            to="/cart"
          >
            Cart
          </Link>
        </li>
      )}

      <li className={Mstyle.navItem}>
        <Link
          style={currentTab(history, "/cakes")}
          className={Mstyle.link}
          to="/cakes"
        >
          Cakes
        </Link>
      </li>
      <li className={Mstyle.navItem}>
        <Link className={Mstyle.link} style={currentTab(history, "/")} to="/">
          Home
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
