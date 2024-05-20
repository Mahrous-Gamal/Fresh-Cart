import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "../Login/Signin.css";
import Froget from "../../Assets/Images/forgetLock.svg"
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";


export default function ForgetPassword() {
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);

  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoaderbtn(false);
        if (response.data.statusMsg === "success") {
          navigate("/VerifyResetCode");
          toast.success("Password Reset Link Sent Successfully");

        }
      })
      .catch((error) => {
        setLoaderbtn(false);
        setError(error?.response?.data?.message);
        toast.error("There is no user registered with this email address");
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

  let formik = useFormik({
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
          <form onSubmit={formik.handleSubmit}>
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger text-start" >
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            <div className="text-end">
              <button
                disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Submit
                  </>
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
