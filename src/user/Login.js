import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import Lstyle from "./allStyle/login.module.css";
import {
  login,
  authenticate,
  isAuthenticated,
} from "../auth/api/Authentication";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors, loading: false });
          console.log("DATA.ERRORS works");
        }
        if (data.message) {
          setValues({ ...values, error: data.message, loading: false });
          console.log("DATA.MESSAGE works");
        }
        if (data.user) {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("login request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated().user) {
        return <Redirect to="/" />;
      }
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className={Lstyle.loadingMainDiv}>
          <h2 className={Lstyle.loadingAlert}>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className={Lstyle.eMessageMainDiv}>
        <div className={Lstyle.eAlert} style={{ display: error ? "" : "none" }}>
          {error}
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className={Lstyle.mainContainer}>
        <div className={Lstyle.formContainer}>
          <form>
            <div className={Lstyle.singleFiled}>
              <label className={Lstyle.formLabel}>Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className={Lstyle.inputFiled}
                type="email"
              />
            </div>

            <div className={Lstyle.singleFiled}>
              <label className={Lstyle.formLabel}>Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className={Lstyle.inputFiled}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className={Lstyle.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Login;
