import React, { useState, useEffect } from "react";
import Image1 from "../../Assets/Images/slider-1.jpg";
import Image2 from "../../Assets/Images/slider-2.jpg";
import MainSlider from "../MainSlider/MainSlider";
import { useNavigate } from "react-router-dom";
// import MyVerticallyCenteredModal from "../GoSignIn/GoSignIn";
import { Helmet } from "react-helmet";
import Categories from '../../Pages/Categories/Categories';
import Products from '../../Pages/Products/Products';


export default function WelcomePage() {
  const [modalShow, setModalShow] = useState(false);

  /****************************************************************/
  const [isOnline, setIsOnline] = useState(navigator.onLine);
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
  /****************************************************************/

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
      </div>

      <Categories />
      <Products />

    </>
  );
}
