import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "../Signin/Signin.css";
import Froget from "../../Assets/Images/forgetLock.svg"
import { Helmet } from "react-helmet";


export default function ForgetPassword() {
  let [err, setErr] = useState("");
  let gotVCode = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoaderbtn(false);
        if (res.data.statusMsg === "success") {
          gotVCode("/VerifyResetCode");
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
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      email: "",
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
        <title>Fresh Cart | Forget Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div style={{ paddingTop: "100.49px" }}>
        <div className="w-75 w-small-75 m-auto my-5 text-center" >
          <img src={Froget} alt="" />
          <h2 className="mb-4 fw-bold text-dark mt-4">Forget Password !</h2>
          <p className="fs-6">Don't worry, we'll cover you. Enter the email address associated with this account.</p>
          <form onSubmit={registr.handleSubmit}>
            {/* <label htmlFor="Email text">Email:</label> */}
            {/* <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="email"
              name="email"
              className="form-control mb-3"
              id="Email"
            />
            {registr.errors.email && registr.touched.email ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.email}
              </div>
            ) : (
              ""
            )}
            {err ? (
              <div className="alert alert-danger" role="alert">
                {err}
              </div>
            ) : (
              ""
            )} */}
            <div className="input-group  my-2">
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
              <div className="text-danger text-start" >
                *{registr.errors.email}
              </div>
            ) : (
              ""
            )}
            <div className="text-end">
              <button
                disabled={!(registr.dirty && registr.isValid)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                {loaderbtn ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
