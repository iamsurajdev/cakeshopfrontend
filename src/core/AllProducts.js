import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/api/AdminApi";
import Astyle from "./allstyles/allproducts.module.css";
import { logout, isAuthenticated } from "../auth/api/Authentication";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        console.log(isAuthenticated());
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base>
      <div className={Astyle.mainComponent}>
        {products.map((product, index) => {
          return (
            <div key={index} className={Astyle.card}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default AllProducts;
