import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import MyPhoto from '../../Assets/Images/its me.jpg';
import { toast } from "react-toastify";
import ChangePassword from '../../Components/ChangePassword/ChangePassword';
import UpdateData from '../../Components/UpdateData/UpdateData';
import "./Profile.css"


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

          <div className="row mt-4">
            <div className="col-xl-4 col-lg-4 col-md-12  col-sm-12 ">
              <div className="account">
                <img src={MyPhoto} alt="" />
              </div>
              <div className="d-flex mb-5">
                <div>
                  <h4 className="fw-bold mt-3">Account Details</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      Name: <span className="fw-bold">{data?.name}  Mahrous Gamal</span>
                    </li>
                    <li>
                      Email:{" "}
                      <span className="fw-bold">
                        {localStorage.getItem("email")}
                      </span>
                    </li>
                    <li>
                      Your role: <span className="fw-bold">{data?.role} User</span>{" "}
                    </li>
                  </ul>
                  <h4 className="fw-bold">My Orders</h4>
                  <ul style={{ listStyle: "none" }}>
                    <li className="fw-bold">
                      My Bill
                    </li>
                    <li className="fw-bold">
                      Tax Invoices
                    </li>
                    <li className="fw-bold">
                      Your role: User <span className="fw-bold">{data?.role}</span>{" "}
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="col-xl-8 col-lg-8 col-md-12  col-sm-12 border pb-3">
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
