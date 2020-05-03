import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaProduct } from "./api/AdminApi";
import { isAuthenticated } from "../auth/api/Authentication";
import APstyle from "./allStyle/aProduct.module.css";

const AddProduct = () => {
  const { id, token } = isAuthenticated();

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
    firmData: "",
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

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(id, token, formData).then((data) => {
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
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div style={{ display: createdProduct ? "" : "none" }}>
      <h4 className={APstyle.sAlert}>{createdProduct} created successfully</h4>
    </div>
  );
  const errorMessage = () => {
    if (error) {
      return (
        <div className={APstyle.eAlert}>
          <h4>{error}</h4>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <div className={APstyle.singleFiled}>
        <label className={APstyle.formLabel}>Post photo</label>
        <input
          className={APstyle.inputFiled}
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
        />
      </div>
      <div className={APstyle.singleFiled}>
        <input
          onChange={handleChange("name")}
          name="photo"
          className={APstyle.inputFiled}
          placeholder="Name"
          value={name}
        />
      </div>
      <div className={APstyle.singleFiled}>
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className={APstyle.inputFiled}
          placeholder="Description"
          value={description}
        />
      </div>
      <div className={APstyle.singleFiled}>
        <input
          onChange={handleChange("price")}
          type="number"
          className={APstyle.inputFiled}
          placeholder="Price"
          value={price}
        />
      </div>
      <div className={APstyle.singleFiled}>
        <select
          onChange={handleChange("category")}
          className={APstyle.inputFiled}
          placeholder="Category"
        >
          <option className={APstyle.dropdownFiled}>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className={APstyle.singleFiled}>
        <input
          onChange={handleChange("stock")}
          type="number"
          className={APstyle.inputFiled}
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className={APstyle.button}>
        Create Product
      </button>
    </form>
  );

  const goBackButton = () => (
    <Link to="/admin/dashboard" className={APstyle.goBackButton}>
      Admin Home
    </Link>
  );

  return (
    <Base>
      {successMessage()}
      {errorMessage()}
      <div className={APstyle.topHeading}>
        <h1>Add Product Page</h1>
      </div>
      <div className={APstyle.mainContainer}>
        <div className={APstyle.formContainer}>
          {createProductForm()}
          {goBackButton()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
