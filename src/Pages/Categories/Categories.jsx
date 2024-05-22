import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Category from "../../Components/Category/Category";
import { Helmet } from "react-helmet";
import Loader from './../../Components/Loader/Loader';


export default function Categories() {

  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data,isLoading } = useQuery("getCategory", getCategory);

  if (isLoading) {
    return <Loader />;
  }

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container my-5" style={{ paddingTop: "74.49px" }}>
        <div className="row">
          {data?.data?.data?.map((item) => {
            return <Category key={item._id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
