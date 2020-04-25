import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getProduct, updateProduct } from "./api/AdminApi";
import { isAuthenticated } from "../auth/api/Authentication";
import UPstyle from "./allStyle/uProduct.module.css";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div style={{ display: createdProduct ? "" : "none" }}>
      <h4 className={UPstyle.sAlert}>{createdProduct} updated successfully</h4>
    </div>
  );
  const errorMessage = () => {
    if (error) {
      return (
        <div className={UPstyle.eAlert}>
          <h4>{error}</h4>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <div className={UPstyle.singleFiled}>
        <label className={UPstyle.formLabel}>Post photo</label>
        <input
          onChange={handleChange("photo")}
          className={UPstyle.inputFiled}
          type="file"
          name="photo"
          accept="image"
        />
      </div>
      <div className={UPstyle.singleFiled}>
        <input
          onChange={handleChange("name")}
          name="photo"
          className={UPstyle.inputFiled}
          placeholder="Name"
          value={name}
        />
      </div>
      <div className={UPstyle.singleFiled}>
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className={UPstyle.inputFiled}
          placeholder="Description"
          value={description}
        />
      </div>
      <div className={UPstyle.singleFiled}>
        <input
          onChange={handleChange("price")}
          type="number"
          className={UPstyle.inputFiled}
          placeholder="Price"
          value={price}
        />
      </div>
      <div className={UPstyle.singleFiled}>
        <select
          onChange={handleChange("category")}
          className={UPstyle.inputFiled}
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className={UPstyle.singleFiled}>
        <input
          onChange={handleChange("stock")}
          type="number"
          className={UPstyle.inputFiled}
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className={UPstyle.button}>
        Update Product
      </button>
    </form>
  );

  const goBackButton = () => (
    <Link to="/admin/dashboard" className={UPstyle.goBackButton}>
      Admin Home
    </Link>
  );

  return (
    <Base>
      {successMessage()}
      {errorMessage()}
      <div className={UPstyle.topHeading}>
        <h1>Update Product Page</h1>
      </div>

      <div className={UPstyle.mainContainer}>
        <div className={UPstyle.formContainer}>
          {createProductForm()}
          {goBackButton()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
