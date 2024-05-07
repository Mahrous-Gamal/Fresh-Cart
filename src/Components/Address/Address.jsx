import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { storeContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";


export default function Address() {
  let { id } = useParams()
  let { pay } = useContext(storeContext)
  let [err, setErr] = useState("");
  let gothome = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
  async function payPay(values) {
    setLoaderbtn(1)
    let { data } = await pay(id, values)
    if (data.status === "success") {
      setLoaderbtn(0)
      window.location.href = data.session.url
    } else {
      toast.error('error')
      setLoaderbtn(0)
    }
    console.log(data)
  }

  function validationSchema() {
    const errors = Yup.object({
      details: Yup.string().max(100).required("Details is a required field"),
      phone: Yup.string()
        .matches(
          /^01[0125][0-9]{8}$/,
          "Enter a valid phone number"
        )
        .required("Phone is a required field"),
      city: Yup.string()
        .matches(
          /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/,
          "Enter a valid City"
        )
        .required("City is a required field"),
    });
    return errors;
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      payPay(values);
    },
  });

  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2 className="mb-5 fw-bold text-dark">Address Now</h2>
          <form onSubmit={address.handleSubmit}>
            <label htmlFor="details">Details:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="text"
              name="details"
              className="form-control my-2"
              id="details"
            />
            {address.errors.details && address.touched.details ? (
              <p className="text-danger">

                *{address.errors.details}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="phone">Phone:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="tel"
              name="phone"
              className="form-control my-2"
              id="phone"
            />
            {address.errors.phone && address.touched.phone ? (
              <p className="text-danger">

                *{address.errors.phone}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="city">City:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="text"
              name="city"
              className="form-control my-2"
              id="city"
            />
            {address.errors.city && address.touched.city ? (
              <div className="text-danger">
                *{address.errors.city}
              </div>
            ) : (
              ""
            )}

            {err ? (
              <div className="text-danger">

                {err}
              </div>
            ) : (
              ""
            )}

            <div className="text-end">
              <button
                disabled={!(address.dirty && address.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
