import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/api/Authentication";
import { Link } from "react-router-dom";
import { CreateCategory } from "./api/AdminApi";
import ACstyle from "./allStyle/aCategory.module.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className={ACstyle.goBackButton} to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired

    CreateCategory(id, token, { name }).then((data) => {
      if (data.error) {
        setError("true");
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMassage = () => {
    if (success) {
      return <h4 className={ACstyle.sAlert}>Category Created Successfully</h4>;
    }
  };
  const errorMassage = () => {
    if (error) {
      return <h4 className={ACstyle.eAlert}> Failed to Created Category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <p className={ACstyle.formLabel}>Enter the category</p>
      <input
        type="text"
        className={ACstyle.inputFiled}
        onChange={handleChange}
        value={name}
        autoFocus
        required
        placeholder="For Ex. Summer"
      />
      <button onClick={onSubmit} className={ACstyle.button}>
        Create Category
      </button>
    </form>
  );

  return (
    <Base>
      {successMassage()}
      {errorMassage()}
      <div className={ACstyle.mainContainer}>
        <div className={ACstyle.formContainer}>
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
