import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import "../Signin/Signin.css";
import { Helmet } from "react-helmet";


export default function Signin() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => { setShowPassword((prevState) => !prevState); };

  let [err, setErr] = useState("");
  let gothome = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoaderbtn(false);
        localStorage.setItem("token", res.data.token);
        if (res.data.message === "success") {
          console.log(values)

          localStorage.setItem("email", JSON.parse(values).email)
          gothome("/home");
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
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Login </h2>
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
            <label htmlFor="password" >Password:</label>
            {/* <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="password"
              className="form-control mb-3"
              id="Pass"
            />
            {registr.errors.password && registr.touched.password ? (
              <div className="alert alert-danger" >
                {registr.errors.password}
              </div>
            ) : (
              ""
            )}
            {err ? (
              <div className="alert alert-danger" >
                {err}
              </div>
            ) : (
              ""
            )} */}
            <div className="input-group position-relative my-2">
              <span className="input-group-text">
                {/* <FontAwesomeIcon
                  icon={faLock}
                  className="lock-icon text-main fs-5"
                /> */}
                <FiLock className="lock-icon text-main fs-5" />

              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="e.g. user#123"
                onBlur={registr.handleBlur}
                onChange={registr.handleChange}
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
            {registr.errors.password && registr.touched.password ? (
              <p className="text-danger" >
                *{registr.errors.password}
              </p>
            ) : (
              ""
            )}
            <Link to="/forgetPass" className="forgetPass">
              Forgot Password ?
            </Link>
            <div className="text-end">
              <button
                disabled={!(registr.dirty && registr.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Login
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="fw-bold mt-3">Don't have an account ?
              <Link to="/signup" className="text-main ms-1">
                Signup now
              </Link></p>
          </form>
        </div>
      </div>

    </>
  );
}
