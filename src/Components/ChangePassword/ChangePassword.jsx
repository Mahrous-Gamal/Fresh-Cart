import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";


export default function ChangePassword() {

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPassword = () => { setShowCurrentPassword((prevState) => !prevState); };
  const toggleNewPassword = () => { setShowNewPassword((prevState) => !prevState); };
  const toggleConfirmPassword = () => { setShowConfirmPassword((prevState) => !prevState); };

  let [error, setError] = useState(null);


  const [loaderbtn, setLoaderbtn] = useState(false);

  let navigate = useNavigate();

  function sign_up(values) {
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          },
        }
      )
      .then((response) => {
        setLoaderbtn(false);
        if (response?.data?.message === 'success') {
          toast.success("Your Password has been updated successfully");

          localStorage.clear()
          navigate('/login');
        }
      })
      .catch((error) => {
        setLoaderbtn(false);
        toast.error(error?.response?.data?.errors?.msg);
      });
  }

  function validationSchema() {
    const errors = Yup.object({
      currentPassword: Yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character"
      )
        .required("Current Password is a required field"),

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
      currentPassword: "",
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

      <div className="m-auto">
        <h4 className="mb-4 fw-bold text-dark">Change password</h4>
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="currentPassword">Current Password:</label>
          <div className="input-group position-relative my-2">
            <span className="input-group-text">
              <FiLock className="lock-icon text-main fs-5" />

            </span>
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="form-control"
              placeholder="••••••••"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="currentPassword"
              id="currentPassword"
            />
            <span
              className="input-group-textt"
              onClick={toggleCurrentPassword}
            >
              {showCurrentPassword ? (
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
          {formik.errors.currentPassword && formik.touched.currentPassword && (
            <p className="text-danger">
              {formik.errors.currentPassword}
            </p>
          )}
          <label htmlFor="Password">New Password:</label>
          <div className="input-group position-relative my-2">
            <span className="input-group-text">
              <FiLock className="lock-icon text-main fs-5" />

            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              className="form-control"
              placeholder="••••••••"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="password"
              id="password"
            />
            <span
              className="input-group-textt"
              onClick={toggleNewPassword}
            >
              {showNewPassword ? (
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
            <p className="text-danger">
              {formik.errors.password}
            </p>
          )}
          <label htmlFor="rePassword">Confirm New Password:</label>
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
            <p className="text-danger">
              {formik.errors.rePassword}
            </p>
          )}
          {error && (
            <p className="text-danger">
              {error}
            </p>
          )}
          <div className="text-start">
            <button
              // disabled={!(formik.dirty && formik.isValid)}
              type="submit"
              className="btn btn-main bg-main text-white mt-3"

            >
              {loaderbtn ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i> Change Password
                </>

              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
