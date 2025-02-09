import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Signin from '../Login/Login';


export default function ForgetPass() {
  let [error, setError] = useState(null);

  const navigate = useNavigate();
  const [loaderbtn, setLoaderbtn] = useState(false);

  const sign_in = (values) => {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoaderbtn(false);
        (response.status === 200) ? navigate("/resetPassword") : setError(response?.data?.message);

      })
      .catch((error) => {
        setLoaderbtn(false);
        setError(error?.response?.data?.message);
        toast.error("Reset code is invalid or has expired");
        console.log(error?.response?.data?.message);


      });
  };

  const validationSchema = () => {
    return Yup.object({
      resetCode: Yup.string().min(5, "Reset code must be at least 5 digits").max(8, "Reset code must be at most 8 digits").required("Reset code is a required field"),
    });
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Reset Code</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Verify Reset Code</h2>
          <p className="fw-bold">Enter the 6-digit code</p>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="resetCode">Reset Code:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              name="resetCode"
              className="form-control my-2"
              id="resetCode"
              placeholder="6-digit code"
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <p className="text-danger">
                {formik.errors.resetCode}
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
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> verify
                  </>

                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
