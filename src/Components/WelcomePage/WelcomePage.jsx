import React, { useState, useEffect } from "react";
import Image1 from "../../Assets/Images/slider-image-1.jpeg";
import Image2 from "../../Assets/Images/slider-image-2.jpeg";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// import MyVerticallyCenteredModal from "../GoSignIn/GoSignIn";
import { Helmet } from "react-helmet";


export default function WelcomePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modalShow, setModalShow] = useState(false);
  let x = useNavigate();
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("getCategory", getCategory);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container posss my-3 " style={{ paddingTop: "74.49px" }}>
        <div className="row">
          <div className="col-md-8 p-0">
            <MainSlider />
          </div>
          <div className="col-md-4 p-0 d-md-block d-none">
            <img
              src={Image1}
              alt="grocery-banner"
              className="w-100"
              height={275}
            />
            <img
              src={Image2}
              alt="grocery-banner"
              className="w-100"
              height={275}
            />
          </div>
        </div>
        <h3 className="mt-5 mb-3">Shop Popular Categories</h3>
        ...
        {/* <DataPagination /> */}
      </div>
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
}
