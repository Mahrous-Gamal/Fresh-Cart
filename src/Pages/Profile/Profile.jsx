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
import { FiSettings } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { GoQuestion } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";

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
                <img src={MyPhoto} alt="" className="ms-auto" />
                <p className="fw-bold fs-5 text-center mt-2" >{data?.name}  Mahrous Gamal</p>

              </div>
              <div className=" mb-5">

                <ul style={{ listStyle: "none" }} className="account-info">
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3  mt-4 ">
                    <FiSettings className="fs-3 me-2" /> Account settings
                  </li>
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3">
                    <MdOutlineShoppingCart className="fs-3 me-2" /> Purchase History
                  </li>
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3">
                    <AiOutlineMessage className="fs-3 me-2" /> Feedback
                  </li>
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3">
                    <GoQuestion className="fs-3 me-2" /> Help & Support
                  </li>
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3">
                    <LuUsers className="fs-3 me-2" /> About us
                  </li>
                  <li className="fw-bold mb-3 border-bottom border-dark pb-3">
                    <LuLogIn className="fs-3 me-2" /> Sign Out
                  </li>
                </ul>

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
