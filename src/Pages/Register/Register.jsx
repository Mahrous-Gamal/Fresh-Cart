import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone, FiLock } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "../Login/Signin.css";


export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => { setShowPassword((prevState) => !prevState); };
  const toggleConfirmPassword = () => { setShowConfirmPassword((prevState) => !prevState); };


  let [error, setError] = useState(null);

  const [loaderbtn, setLoaderbtn] = useState(false);

  let navigate = useNavigate();

  function sign_up(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        if (response.data.message === "success") {
          navigate("/login");
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
      name: Yup.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").required("Name is a required field"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required("Email is a required field"),
      phone: Yup.string()
        .matches(
          /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
          "Please enter a valid phone number"
        )
        .required("Phone is a required field"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required("Password is a required field"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirm Password does not match")
        .required("Confirm Password is a required field"),
    });
    return errors;

  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
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

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>

            <div className="input-group my-2">
              <span className="input-group-text">
                <FiUser className="user-icon text-main fs-5" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. John Doe"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="name"
                id="name"
              />

            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="text-danger" >
                *{formik.errors.name}
              </p>
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-danger" >
                *{formik.errors.email}
              </p>
            )}

            <label htmlFor="phone">Phone:</label>

            <div className="input-group my-2">
              <span className="input-group-text">
                <FiPhone className="user-icon text-main fs-5" />

              </span>
              <input
                className="form-control"
                placeholder="123-456-7890"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="tel"
                name="phone"
                id="phone"
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-danger" >
                *{formik.errors.phone}
              </p>
            )}

            <label htmlFor="password">Password:</label>

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
            {formik.errors.password && formik.touched.password && (
              <p className="text-danger" >
                {formik.errors.password}
              </p>
            )}
            <label htmlFor="rePassword">Confirm Password:</label>

            <div className="input-group position-relative my-2">
              <span className="input-group-text">
                <FiLock className="lock-icon text-main fs-5" />

              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="rePassword"
                id="rePassword"
              />
              <span
                className="input-group-textt"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
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
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-danger" >
                {formik.errors.rePassword}
              </p>
            )}
            <div className="text-end">
              <button
                // disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                className="btn btn-main bg-main text-white"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Create Account
                  </>

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
