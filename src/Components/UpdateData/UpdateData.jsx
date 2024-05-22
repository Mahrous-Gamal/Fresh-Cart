import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";


export default function UpdateData() {


  const [data, setData] = useState(null);
  useEffect(() => {
    const decode = jwtDecode(localStorage.getItem("token"));

    setData(decode);
  }, []);

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
          localStorage.setItem('phone', response?.data?.user?.phone)

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
      phone: Yup.string()
        .matches(
          /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
          "Please enter a valid phone number"
        )
        .required("Phone is a required field"),
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
      <div >

        <h2 className="mb-3 fw-bold text-dark">Your info </h2>
        <form onSubmit={formik.handleSubmit}>

          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">

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
                  defaultValue={data?.name}
                />

              </div>
              {formik.errors.name && formik.touched.name && (
                <p className="text-danger">
                  *{formik.errors.name}
                </p>
              )}
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
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
                  defaultValue={localStorage.getItem("email")}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="text-danger">
                  *{formik.errors.email}
                </p>
              )}
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
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
                // defaultValue={localStorage.getItem("phone")}

                />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-danger" >
                  *{formik.errors.phone}
                </p>
              )}
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
              <div className="gender mt-2">
                <input type="radio" name="gender" id="male" className="specifyColor ms-3" checked /> <label htmlFor="male">User</label>
                <input type="radio" name="gender" className="specifyColor ms-3" id="female" /> <label htmlFor="female">Admin</label>
              </div>
            </div>
          </div>


          <div className="text-start">
            <button
              // disabled={!(formik.dirty && formik.isValid)}
              type="submit"
              className="btn btn-main bg-main text-white mt-3"
            >
              {loaderbtn ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i> Save Changes
                </>

              ) : (
                "Save Changes"
              )}

            </button>
          </div>
        </form>
      </div>

    </>
  );
}