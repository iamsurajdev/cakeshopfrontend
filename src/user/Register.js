import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { register } from "../auth/api/Authentication";
import Rstyle from "./allStyle/register.module.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // setValues({ ...values, error: false });
    register({ name, email, password })
      .then((data) => {
        console.log(data);

        if (data.errors) {
          setValues({ ...values, error: data.errors, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log(error));
  };

  const signUpForm = () => {
    return (
      <div className={Rstyle.mainContainer}>
        <div className={Rstyle.formContainer}>
          <form>
            <div className={Rstyle.singleFiled}>
              <label className={Rstyle.formLabel}>Name</label>
              <input
                className={Rstyle.inputFiled}
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className={Rstyle.singleFiled}>
              <label className={Rstyle.formLabel}>Email</label>
              <input
                className={Rstyle.inputFiled}
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className={Rstyle.singleFiled}>
              <label className={Rstyle.formLabel}>Password</label>
              <input
                onChange={handleChange("password")}
                className={Rstyle.inputFiled}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className={Rstyle.button}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className={Rstyle.sMessageMainDiv}>
        <div
          className={Rstyle.sAlert}
          style={{ display: success ? "" : "none" }}
        >
          New account was created successfully. Please
          <Link to="/Login">Login Here</Link>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className={Rstyle.eMessageMainDiv}>
        <div className={Rstyle.eAlert} style={{ display: error ? "" : "none" }}>
          {error}
        </div>
      </div>
    );
  };

  return (
    <Base>
      {errorMessage()}
      {successMessage()}

      {signUpForm()}
    </Base>
  );
};

export default Register;
