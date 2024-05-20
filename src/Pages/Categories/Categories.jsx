import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Category from "../../Components/Category/Category";

import { Helmet } from "react-helmet";
import Slider from "react-slick";


export default function Categories() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 550,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1550,
  };

  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, } = useQuery("getCategory", getCategory);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container my-4 "
        style={{ paddingTop: "20.49px" }}
      >        <h3 className="mb-4 fw-bold">Featured Categories</h3>

        <div className="row g-0">
          <Slider {...settings}>

            {data?.data?.data.map((item) => (
              <Category key={item._id} item={item} />
            ))}
          </Slider>

        </div>
      </div>
    </>
  );
}
