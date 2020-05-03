import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/api/Authentication";
import { getProducts, deleteProduct } from "./api/AdminApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import MPstyle from "./allStyle/mProduct.module.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { id, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <div className={MPstyle.topContainer}>
        <h2 className={MPstyle.mainHeading}>All products:</h2>
        <Link className={MPstyle.adminHomeButton} to={`/admin/dashboard`}>
          Admin Home
        </Link>
      </div>

      <div className="row">
        <div className={MPstyle.mainContainer}>
          <h2 className="">All Products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className={MPstyle.categoryRow}>
                <div className={MPstyle.categoryName}>
                  <h3 className="">{product.name}</h3>
                </div>
                <div className={MPstyle.categoryUpdate}>
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </div>
                <div className={MPstyle.categoryDelete}>
                  <p
                    onClick={() => {
                      deleteThisProduct(product._id);
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
      </div>
    </Base>
  );
};

export default ManageProducts;
