import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { storeContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import Slider from "react-slick";


export default function ProductDetails() {
  let { setCounter, addToCart } = useContext(storeContext);
  let [loading, setLoading] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  async function addproductToCart(productId) {
    try {
      setLoading(0);
      let { data } = await addToCart(productId);
      if (data?.status === "success") {
        toast.success("Product added successfully");
        setCounter(data?.numOfCartItems);
        setLoading(1);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  let id = useParams();
  let [prouducts, setProuducts] = useState();
  async function getData() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id.id}`
      );
      setProuducts(data?.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Error fetching product data");
    }
  }
  useEffect(() => {
    getData();

  }, []);
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
  function onlineInBtn() {
    if (isOnline) {
      addproductToCart(prouducts?._id)
      console.log("online")
    }
    else {
      toast.error("Error you are offline");
      console.log("off")
    }
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true
  };

  if (prouducts) {
    return (
      <>
        <div className="container mt-5 mb-3" style={{ paddingTop: '74.49px' }}>
          <div className="row pt-5 align-items-center g-4">
            <div className="col-md-4">
              <div className="layer">
                <Slider {...settings}>
                  {prouducts?.images?.map((item, idx) => {
                    return (<div key={idx}>
                      <img src={item} alt={prouducts.title} className="w-100" />
                    </div>)
                  })}
                </Slider>
              </div>
            </div>
            <div className="col-md-8">
              <div className="layer">
                <h2 className="mb-3">{prouducts.title}</h2>
                <p className="text-muted ps-2">{prouducts.description}</p>
                <span>{prouducts.category.name}</span>
                <div className="mt-3 d-flex justify-content-between">
                  <div>
                    <p>{prouducts.price} EGP</p>
                  </div>
                  <div>
                    <i className="fa-solid fa-star pe-1 rating-color"></i>
                    {prouducts.ratingsAverage}
                  </div>
                </div>
                <button
                  disabled={!loading}
                  onClick={onlineInBtn}
                  className=" btn bg-main w-100 text-white"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-plus"></i> Add To Cart
                    </>
                  ) : (
                    "Loading..."
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <Loader />;
  }
}
