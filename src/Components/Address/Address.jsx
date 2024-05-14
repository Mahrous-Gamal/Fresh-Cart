import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";


export default function Address() {
  let { id } = useParams()

  let { pay } = useContext(cartContext)

  let [error, setError] = useState("");


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
  }

  function validationSchema() {
    const errors = Yup.object({
      details: Yup.string().max(100, "Details must be at most 100 characters").required("Details is a required field"),
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

  let formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: ""

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
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="phone">Phone:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              name="phone"
              className="form-control my-2"
              placeholder="123-456-7890"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-danger">

                *{formik.errors.phone}
              </p>
            ) : (
              ""
            )}
            <label htmlFor="city">City:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              name="city"
              className="form-control my-2"
              id="city"
            />
            {formik.errors.city && formik.touched.city ? (
              <div className="text-danger">
                *{formik.errors.city}
              </div>
            ) : (
              ""
            )}


            <label htmlFor="details">Details:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              name="details"
              className="form-control my-2"
              id="details"
            />
            {formik.errors.details && formik.touched.details ? (
              <p className="text-danger">

                *{formik.errors.details}
              </p>
            ) : (
              ""
            )}

            {error ? (
              <div className="text-danger">

                {error}
              </div>
            ) : (
              ""
            )}

            <div className="text-end">
              <button
                disabled={!(formik.dirty && formik.isValid)}
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
    </>
  );
}
