import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiUser } from "react-icons/fi";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import "../Signin/Signin.css";
import { Helmet } from "react-helmet";


export default function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);

  const togglePassword = () => { setShowPassword((prevState) => !prevState); };
  const togglePasswordd = () => { setShowPasswordd((prevState) => !prevState); };


  let [err, setErr] = useState("");
  const [loaderbtn, setLoaderbtn] = useState(false);
  let gotSignin = useNavigate();

  function sign_up(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          gotSignin("/signin");
        }
      })
      .catch((err) => {
        setErr(err?.response?.data?.message);
      });
  }

  function validationSchema() {
    const errors = Yup.object({
      name: Yup.string().min(3).max(20).required("Name is a required field"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required("Email is a required field"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required("Confirm Password is a required field"),
    });
    return errors;
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sign_up(JSON.stringify(values));
    },
  });

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Register Now </h2>
          <form onSubmit={register.handleSubmit}>
            <label htmlFor="name">Name:</label>

            <div className="input-group my-2">
              <span className="input-group-text">
                {/* <FontAwesomeIcon
                  icon={faCircleUser}
                  className="user-icon text-main fs-5"
                /> */}
                <FiUser className="user-icon text-main fs-5" />

              </span>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. John Doe"
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                name="name"
                id="name"
              />

            </div>
            {register.errors.name && register.touched.name ? (
              <p className="text-danger" >
                *{register.errors.name}
              </p>
            ) : (
              ""
            )}
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
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {register.errors.email && register.touched.email ? (
              <p className="text-danger" >
                *{register.errors.email}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="password">Password:</label>

            <div className="input-group position-relative my-2">
              <span className="input-group-text">
                <FiLock className="lock-icon text-main fs-5" />

              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="e.g. user#123"
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                name="password"
                id="password"
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
            {register.errors.password && register.touched.password ? (
              <p className="text-danger" >
                *{register.errors.password}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="rePassword">Confirm Password:</label>

            <div className="input-group position-relative my-2">
              <span className="input-group-text">
                <FiLock className="lock-icon text-main fs-5" />

              </span>
              <input
                type={showPasswordd ? "text" : "password"}
                className="form-control"
                placeholder="e.g. user#123"
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                name="repassword"
                id="rePassword"
              />
              <span
                className="input-group-textt"
                onClick={togglePassword}
              >
                {showPasswordd ? (
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
            {register.errors.rePassword && register.touched.rePassword ? (
              <p className="text-danger" >
                *{register.errors.rePassword}
              </p>
            ) : (
              ""
            )}
            <div className="text-end">
              <button
                disabled={!(register.dirty && register.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Create Account"
                )}

              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
