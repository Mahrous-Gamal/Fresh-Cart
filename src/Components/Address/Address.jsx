import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Address() {
  const { id } = useParams();
  const { pay } = useContext(CartContext);
  const [loaderbtn, setLoaderbtn] = useState(false);

  async function payItem(values) {
    setLoaderbtn(true);
    try {
      const response = await pay(id, values);

      if (response.status === 200 && response.data.status === "success") {
        window.location.href = response.data.session.url;
        toast.success("Payment success");
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      toast.error("An error occurred while processing payment");
    }
    setLoaderbtn(false);
  }


  const validationSchema = Yup.object({
    details: Yup.string().max(100, "Details must be at most 100 characters").required("Details is a required field"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number")
      .required("Phone is a required field"),
    city: Yup.string()
      .matches(/^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/, "Enter a valid City")
      .required("City is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: ""
    },
    validationSchema: validationSchema,
    // onSubmit: (values) => {
    //   payItem(values);
    // },

    onSubmit: (values) => {
      if (formik.isValid) {
        payItem(values);
      } else {
        toast.error("Please fill in all required fields correctly");
      }
    },
  });

  return (
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
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-danger">*{formik.errors.phone}</p>
          )}
          <label htmlFor="city">City:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="city"
            className="form-control my-2"
            id="city"
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city && (
            <div className="text-danger">*{formik.errors.city}</div>
          )}

          <label htmlFor="details">Details:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="details"
            className="form-control my-2"
            id="details"
            value={formik.values.details}
          />
          {formik.errors.details && formik.touched.details && (
            <p className="text-danger">*{formik.errors.details}</p>
          )}

          <div className="text-end">
            <button
              disabled={!formik.dirty || !formik.isValid || loaderbtn}
              type="submit"
              className="btn bg-main text-white"
            >
              {loaderbtn ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i> Pay
                </>
              ) : (
                "Pay"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
