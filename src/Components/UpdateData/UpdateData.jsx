import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";


export default function UpdateData() {

  let [error, setError] = useState(null);
  let navigate = useNavigate();

  const [loaderbtn, setLoaderbtn] = useState(false);

  function update(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/users/UpdateMe/", values, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoaderbtn(false);

        if (response?.data?.message === 'success') {
          toast.success("Your Data has been updated successfully");
          localStorage.setItem('email', response?.data?.user?.email)
          navigate("/profile");
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
    });
    return errors;
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);

      update(JSON.stringify(values));
    },
  });

  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Update Now </h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="Name">Name:</label>
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
              <p className="text-danger">
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
              <p className="text-danger">
                *{formik.errors.email}
              </p>
            )}
            {/* 
            {error && (
              <p className="text-danger">
                *{error}
              </p>
            )} */}

            <label htmlFor="phone">Phone:</label>

            <div className="input-group my-2">
              <span className="input-group-text">
                <FiPhone className="user-icon text-main fs-5" />

              </span>
              <input
                className="form-control"
                placeholder="e.g. 01001449752"
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
            <div className="text-end">
              <button
                disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Update
                  </>

                ) : (
                  "Update"
                )}

              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
