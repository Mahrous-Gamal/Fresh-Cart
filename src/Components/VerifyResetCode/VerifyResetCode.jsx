import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";


export default function ForgetPass() {
  const [err, setErr] = useState("");
  const gotnewpass = useNavigate();
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
      .then((res) => {
        setLoaderbtn(false);
        if (res.status === 200) {
          gotnewpass("/ResetPassword");
        } else {
          setErr(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoaderbtn(false);
        setErr(err?.response?.data?.message);
      });
  };

  const validationSchema = () => {
    return Yup.object({
      resetCode: Yup.string().min(2).max(9).required("Reset Code is a required field"),
    });
  };

  const registr = useFormik({
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

      <div style={{ paddingTop: "180.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Verify Reset Code</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="resetCode">Reset Code:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="text"
              name="resetCode"
              className="form-control my-2"
              id="resetCode"
            />
            {registr.errors.resetCode && registr.touched.resetCode ? (
              <p className="text-danger">
                *{registr.errors.resetCode}
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
