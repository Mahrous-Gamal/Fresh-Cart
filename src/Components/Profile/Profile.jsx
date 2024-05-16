import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import MyPhoto from '../../Assets/Images/its me.jpg';
import { toast } from "react-toastify";
import ChangePassword from './../ChangePassword/ChangePassword';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FiUser, FiPhone } from "react-icons/fi";
import "./Profile.css"
import UpdateData from './../UpdateData/UpdateData';


export default function Profile() {
  const [data, setData] = useState(null);
  // useEffect(() => {
  //   const decode = jwtDecode(localStorage.getItem("token"));

  //   setData(decode);
  // }, []);


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

          // navigate("/profile");
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container-lg my-5"
        style={{ paddingTop: "40px", Bottom: "100px" }}
      >
        <div className="shadow p-4">
          <div className="account">
            <img src={MyPhoto} alt="" />
          </div>
          <div className="row mt-4">
            <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12 border">
              <div className="d-flex mb-5">
                <div>
                  <h4 className="fw-bold">Account Details</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Name: <span className="fw-bold">{data?.name}</span>
                    </li>
                    <li>
                      Email:{" "}
                      <span className="fw-bold">
                        {localStorage.getItem("email")}
                      </span>
                    </li>
                    <li>
                      Your role: <span className="fw-bold">{data?.role}</span>{" "}
                    </li>
                  </ul>
                  <h4 className="fw-bold">My Orders</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Name: <span className="fw-bold">{data?.name}</span>
                    </li>
                    <li>
                      Email:{" "}
                      <span className="fw-bold">
                        {localStorage.getItem("email")}
                      </span>
                    </li>
                    <li>
                      Your role: <span className="fw-bold">{data?.role}</span>{" "}
                    </li>
                  </ul>
                  <h4 className="fw-bold"> Tax invoices</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Name: <span className="fw-bold">{data?.name}</span>
                    </li>
                    <li>
                      Email:{" "}
                      <span className="fw-bold">
                        {localStorage.getItem("email")}
                      </span>
                    </li>
                    <li>
                      Your role: <span className="fw-bold">{data?.role}</span>{" "}
                    </li>
                  </ul>
                  <h4 className="fw-bold">My Bills</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Name: <span className="fw-bold">{data?.name}</span>
                    </li>
                    <li>
                      Email:{" "}
                      <span className="fw-bold">
                        {localStorage.getItem("email")}
                      </span>
                    </li>
                    <li>
                      Your role: <span className="fw-bold">{data?.role}</span>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-5">
                <NavLink
                  to="/UpdateData"
                  className="linkItem d-flex align-items-center"
                >
                  <i class="fa-solid fa-pen mt-2 fs-3 me-3"></i>
                  <h4 className="m-0 fw-bold">Update Your Data</h4>
                </NavLink>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-12  col-sm-12 border">
              <div className="info">
                <UpdateData />
                <hr />
                <ChangePassword />
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
