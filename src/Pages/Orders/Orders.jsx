import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useQuery } from "react-query";
import AccordItem from "./AccordItem";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from "react-helmet";


export default function Allorders() {

  let { id } = jwtDecode(localStorage.getItem("token"));

  function getAllOredries() {
    return axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((data) => data)
      .catch((error) => error);
  }
  let { data } = useQuery("getAllOrder", getAllOredries);
  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | All Orders</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      <div
        className="container my-5"
        style={{ paddingTop: "74.49px", paddingBottom: "40px" }}
      >
        {data?.data?.length ? (
          <Accordion defaultActiveKey="0">
            {data?.data?.map((item, idx) => {
              return <AccordItem key={item?._id} item={item} idx={idx + 1} />;
            })}
          </Accordion>
        ) : (
          <div className="mt-4 text-center fs-5 fw-bold">You have no orders, Add products to your cart and start purchasing and making orders</div>
        )}
      </div>
    </>
  );
}
