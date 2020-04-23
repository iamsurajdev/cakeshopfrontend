import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/api/Authentication";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./api/AdminApi";
import UCstyle from "./allStyle/uCategory.module.css";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className={UCstyle.goBackButton} to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data);

      if (data.error) {
        setError("true");
      } else {
        setError("");
        setSuccess(false);
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError();

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError();
          setSuccess(true);
          setName(name);
        }
      }
    );
  };

  const successMassage = () => {
    if (success) {
      return <h4 className={UCstyle.sAlert}>Category Created Successfully</h4>;
    }
  };
  const errorMassage = () => {
    if (error) {
      return <h4 className={UCstyle.eAlert}> {error}</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <p className={UCstyle.formLabel}>update the category</p>
      <input
        type="text"
        className={UCstyle.inputFiled}
        onChange={handleChange}
        value={name}
        autoFocus
        required
      />
      <button onClick={onSubmit} className={UCstyle.button}>
        Update Category
      </button>
    </form>
  );

  return (
    <Base>
      {successMassage()}
      {errorMassage()}
      <div className={UCstyle.mainContainer}>
        <div className={UCstyle.formContainer}>
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
