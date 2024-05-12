import React from "react";
import error from "../../Assets/Images/oops404Error.svg";


export default function NotFound() {
  return (
    <>
      <div className="text-center mt-4">
        <img
          src={error}
          alt="error"
          style={{ height: "90vh" }}
          className="w-100 image-notfound mt-2"
        />
        <p className="fw-bold fs-5">This page you are looking for could not be found.</p>
      </div>

    </>
  );
}
