import React, { useState } from "react";
import { useFormik } from "formik";
// import { Navigate } from "react-router-dom";
import "./App.css";
import { BsEye } from "react-icons/bs";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "This is a required field";
  } else if (values.username.length > 20) {
    errors.username = "Must be 20 characters or less";
  }
  if (!values.firstName) {
    errors.firstName = "This is a required field";
  }
  if (!values.lastName) {
    errors.lastName = "This is a required field";
  }

  if (!values.password) {
    errors.password = "This is a required field";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Must contain one uppercase letter and one number and one character";
  } else if (values.password.length < 6) {
    errors.password = "Must be above 6 characters";
  }

  return errors;
};
const UserSignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passWrdHideShow = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const onSubmit = () => {
    alert("Registered");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validate,
    onSubmit,
  });
  return (
    <div className="user_details_box">
      <div className="main">
        <div className="Sign-Up-form">
          <p>Sign In Form</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="UserName"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="FisrtName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="LastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                type="button"
                className="eye_icon"
                onClick={passWrdHideShow}
              >
                <BsEye className={isShowPassword ? "show_icon" : "hide_icon"} />
              </button>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="auth__form-container_fields-content_button">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
