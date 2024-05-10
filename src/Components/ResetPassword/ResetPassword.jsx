import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import "../Signin/Signin.css";
import { Helmet } from "react-helmet";


export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => { setShowPassword((prevState) => !prevState); };

  let [err, setErr] = useState("");
  let gothome = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoaderbtn(false);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          gothome("/signin");
        }
      })
      .catch((err) => {
        setLoaderbtn(false);
        setErr(err?.response?.data?.message);
      });
  }

  function validationSchema() {
    const errors = Yup.object({
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required("Email is a required field"),
      newPassword: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Confirm Password is a required field"),
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Reset Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{ paddingTop: "100.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Reset Password</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <div className="input-group my-2">
              <span className="input-group-text">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="user-icon text-main fs-5"
                />
              </span>
              <input
                className="form-control"
                placeholder="e.g. user@example.com"
                onBlur={registr.handleBlur}
                onChange={registr.handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {registr.errors.email && registr.touched.email ? (
              <p className="text-danger" >
                *{registr.errors.email}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="newPassword">New Password:</label>
            <div className="input-group position-relative my-2">
              <span className="input-group-text">
                <FiLock className="lock-icon text-main fs-5" />

              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="e.g. user#123"
                onBlur={registr.handleBlur}
                onChange={registr.handleChange}
                name="newPassword"
                id="newPassword"
              />
              <span
                className="input-group-textt"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="eye-icon position-absolute"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="eye-icon eye-slash position-absolute"
                  />
                )}
              </span>
            </div>
            {registr.errors.newPassword && registr.touched.newPassword ? (
              <p className="text-danger" >
                *{registr.errors.newPassword}
              </p>
            ) : (
              ""
            )}
            <div className="text-end">
              <button
                disabled={!(registr.dirty && registr.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Reset Password
                  </>
                  
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
