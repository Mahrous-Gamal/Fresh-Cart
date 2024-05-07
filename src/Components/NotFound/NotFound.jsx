import React from "react";
import error from "../../Assets/Images/oops404Error.svg";
import Footer from "../Footer/Footer";


export default function NotFound() {
  return (
    <>
      <div className="text-center mt-5">
        <img
          src={error}
          alt="error"
          style={{ height: "90vh" }}
          className="w-100 border border-2"
        />
      </div>
      <Footer />
    </>
  );
}
