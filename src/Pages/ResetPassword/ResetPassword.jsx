import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "../Login/Signin.css";


export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => { setShowPassword((prevState) => !prevState); };

  let [error, setError] = useState("");

  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/signin");
        }
      })
      .catch((error) => {
        setLoaderbtn(false);
        setError(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);

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

  let formik = useFormik({
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
          <form onSubmit={formik.handleSubmit}>
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger" >
                {formik.errors.email}
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
                placeholder="••••••••"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <p className="text-danger" >
                {formik.errors.newPassword}
              </p>
            ) : (
              ""
            )}
            <div className="text-end">
              <button
                // disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                className="btn btn-main bg-main text-white"
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
