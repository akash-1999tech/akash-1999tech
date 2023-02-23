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

function App() {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const [isShowPassword, setIsShowPassword] = useState(false);
  // const navigate = useNavigate();
  const users = [];

  const onSubmit = async (values) => {
    users.push(values);
    const account = users.find((user) => user.username === values.username);
    if (account && account.password === values.password) {
      setauthenticated(true);
      await localStorage.setItem("authenticated", true);
      await localStorage.setItem("Username", values.username);
      await localStorage.setItem("Password", values.password);
      window.location.href = "/dashboard";
    }
  };
  const passWrdHideShow = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit,
  });
  return (
    <div className="main">
      <div className="Sign-Up-form">
        <p>Log In Form</p>
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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
