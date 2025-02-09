import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Brand from "../../Components/Brand/Brand";
import { Helmet } from "react-helmet";
import Loader from './../../Components/Loader/Loader';


export default function Brands() {
  function getBrand() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery("getbrand", getBrand);


  if (isLoading) {
    return <Loader />;
  }

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container my-5" style={{ paddingTop: "74.49px" }}>
        <div className="row">
          {data?.data?.data?.map((item) => {
            return <Brand key={item._id} item={item} />;
          })}
        </div>
      </div>
    </>

  );
}
