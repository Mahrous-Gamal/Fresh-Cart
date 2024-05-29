import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Shoping from "../../Assets/Images/Online shopping.svg"
import "./Signin.css";


export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => { setShowPassword((prevState) => !prevState); };

  let [error, setError] = useState(null);

  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        localStorage.setItem("token", response.data.token);

        if (response.data.message === "success") {

          localStorage.setItem("email", JSON.parse(values).email)
          navigate("/home");
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
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
    });
    return errors;
  }

  let formik = useFormik({
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
          <div className="row">

            <div className="col-xl-6 col-lg-6 col-md-12">
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
                <label htmlFor="password" >Password:</label>
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
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-danger" >
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <Link to="/forgetPassword" className="ResetPassword">
                  Forgot Password ?
                </Link>
                <div className="text-end">
                  <button
                    // disabled={!(formik.dirty && formik.isValid)}
                    type="submit"
                    className="btn btn-main bg-main text-white w-100 mt-2"
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
                  <Link to="/signup" className="text-main ms-1 ">
                    Signup now
                  </Link></p>
              </form>
            </div>
            <div className="col-xl-6  col-lg-6 d-lg-block d-none">
              <img src={Shoping}  alt="" />
            </div>

          </div>

        </div>
      </div>

    </>
  );
}
