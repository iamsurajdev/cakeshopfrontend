import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/api/Authentication";
import { getCategories, deleteCategory } from "./api/AdminApi";
import MCstyle from "./allStyle/mCategory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
const ManegeCategories = () => {
  const [categories, setCategories] = useState([]);

  const { id, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <div className={MCstyle.topContainer}>
        <h2 className={MCstyle.mainHeading}>Manege Categories</h2>
        <Link className={MCstyle.adminHomeButton} to={`/admin/dashboard`}>
          Admin Home
        </Link>
      </div>

      <div className={MCstyle.mainContainer}>
        <h2 className="">All Categories</h2>
        {categories.map((category, index) => {
          return (
            <div className={MCstyle.categoryRow}>
              <div className={MCstyle.categoryName}>
                <h3 className="" key={index}>
                  {category.name}
                </h3>
              </div>
              <div className={MCstyle.categoryUpdate}>
                <Link
                  className={MCstyle.updateLink}
                  to={`/admin/category/update/${category._id}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </div>
              <div className={MCstyle.categoryDelete}>
                <p
                  onClick={() => {
                    deleteThisCategory(category._id);
                  }}
                  className=""
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default ManegeCategories;
