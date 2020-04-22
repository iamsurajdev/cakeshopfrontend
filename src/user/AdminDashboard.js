import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/api/Authentication";
import { Link } from "react-router-dom";
import Astyle from "./allStyle/aDashboard.module.css";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className={Astyle.leftSideContainer}>
        <h4 className={Astyle.leftSideHeading}>Admin Navigation</h4>
        <ul className={Astyle.navUl}>
          <li className={Astyle.navItem}>
            <Link to="/admin/create/category" className={Astyle.link}>
              Create Categories
            </Link>
          </li>
          <li className={Astyle.navItem}>
            <Link to="/admin/categories" className={Astyle.link}>
              Manege Categories
            </Link>
          </li>
          <li className={Astyle.navItem}>
            <Link to="/admin/create/product" className={Astyle.link}>
              Create Product
            </Link>
          </li>
          <li className={Astyle.navItem}>
            <Link to="/admin/products" className={Astyle.link}>
              Manege Products
            </Link>
          </li>
          <li className={Astyle.navItem}>
            <Link to="/admin/orders" className={Astyle.link}>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className={Astyle.rightSideContainer}>
        <h4 className={Astyle.rightSideHeading}> Hey, Admin</h4>
        <div className={Astyle.adminInformation}>
          <p>
            Welcome <strong> {name}</strong>, hope you doing well
          </p>
          <p>
            <span className="badge badge-success mr-2">Email: </span> {email}
          </p>
        </div>
        <div className={Astyle.rightSideHeading}>Admin area</div>
      </div>
    );
  };

  return (
    <Base>
      <div className={Astyle.Container}>
        <div className={Astyle.mainBaseContainer}>
          <div className={Astyle.adminLeftSide}>{adminLeftSide()}</div>
          <div className={Astyle.adminRightSide}>{adminRightSide()}</div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
