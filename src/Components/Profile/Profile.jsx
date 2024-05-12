import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Profile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const decode = jwtDecode(localStorage.getItem("token"));
    setData(decode);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container my-5"
        style={{ paddingTop: "74.49px", Bottom: "100px" }}
      >
        <div className="shadow p-5">
          <div className="d-flex mb-5">
            <i className="fa-solid fa-circle-user mt-2 fs-1 me-2"></i>
            <div>
              <h2 className="fw-bold">Your Info</h2>
              <ul style={{ listStyle: "none" }}>
                <li>
                  Name: <span className="fw-bold text-main">{data?.name}</span>
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
              <i className="fa-solid fa-pen-to-square mt-2 fs-3 me-3"></i>
              <h4 className="m-0">Update Your Data</h4>
            </NavLink>
          </div>
          <div className="mb-5">
            <NavLink
              to="/UpdatePass"
              className="linkItem d-flex align-items-center"
            >
              <i className="fa-solid fa-wrench mt-2 fs-3 me-3"></i>
              <h4 className="m-0">Change Password</h4>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
