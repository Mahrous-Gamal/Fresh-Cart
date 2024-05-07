import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";


export default function Signup() {
  let [err, setErr] = useState("");
  let gotSignin = useNavigate();
  function sign_up(values) {
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            token:localStorage.getItem("token")
          },
        }
      )
      .then((res) => {
        if (res?.data?.message == 'success') {
          toast.success(res?.data?.message);
          localStorage.clear()
          gotSignin('/signin');
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.msg);
      });
  }

  function validationSchema() {
    const errors = Yup.object({
      currentPassword: Yup.string().matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required(),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      currentPassword: "",
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
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Update Password :</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="cPass">Current Password:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="currentPassword"
              className="form-control mb-3"
              id="cPass"
            />
            {registr.errors.currentPassword && registr.touched.currentPassword ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.currentPassword}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="Pass">Password:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="password"
              className="form-control mb-3"
              id="Pass"
            />
            {registr.errors.password && registr.touched.password ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.password}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="rPass">RePassword:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="rePassword"
              className="form-control mb-3"
              id="rPass"
            />
            {registr.errors.rePassword && registr.touched.rePassword ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.rePassword}
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
            )}
            <div className="text-end">
              <button
                disabled={!(registr.dirty && registr.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </>
  );
}
