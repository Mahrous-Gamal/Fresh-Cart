import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import Categorie from "../Category/Category";
import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer.jsx";


export default function Categories() {
  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("getCategory", getCategory);
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
        <div className="colomns ">
          {data?.data?.data.map((item) => (
            <Categorie key={item._id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
