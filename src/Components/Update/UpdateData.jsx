import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";


export default function UpdateData() {
  let [err, setErr] = useState("");
  let gotSignin = useNavigate();
  function update(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", values, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => {
        if (data?.data?.message == 'success') {
          toast.success(data?.data?.message);
          localStorage.setItem('email', data?.data?.user?.email)
          gotSignin("/profile");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors?.msg);
      });

  }
  function validationSchema() {
    const errors = Yup.object({
      name: Yup.string().min(3).max(20).required(),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required(),
    });
    return errors;
  }
  let Upd = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      update(JSON.stringify(values));
    },
  });

  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Update Now :</h2>
          <form onSubmit={Upd.handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input
              onBlur={Upd.handleBlur}
              onChange={Upd.handleChange}
              type="text"
              name="name"
              id="Name"
              className="form-control mb-3"
            />
            {Upd.errors.name && Upd.touched.name ? (
              <div className="alert alert-danger " role="alert">
                {Upd.errors.name}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="Email">Email:</label>
            <input
              onBlur={Upd.handleBlur}
              onChange={Upd.handleChange}
              type="email"
              name="email"
              className="form-control mb-3"
              id="Email"
            />
            {Upd.errors.email && Upd.touched.email ? (
              <div className="alert alert-danger" role="alert">
                {Upd.errors.email}
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
                disabled={!(Upd.dirty && Upd.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                Update
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
