import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import Slider from "react-slick";
import Deliveryar from "../../Assets/Images/icon-delivery.svg"
import Return from "../../Assets/Images/Icon-return.svg"

export default function ProductDetails() {

  let { setCounter, addToCart } = useContext(CartContext);
  let [loading, setLoading] = useState(1);

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

  async function addproductToCart(productId) {
    try {
      setLoading(0);
      let { data } = await addToCart(productId);
      if (data?.status === "success") {
        toast.success("Product added to your cart");

        setCounter(data?.numOfCartItems);
        setLoading(1);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  let id = useParams();
  let [products, setProuducts] = useState([]);

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



  function onlineInBtn() {
    if (isOnline) {
      addproductToCart(products?._id)
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
  };


  return (
    <>

      <div className="container my-5" style={{ paddingTop: '5px' }}>
        <div className="row pt-5 g-4">
          <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
            <div className="layer">
              <Slider {...settings}>
                {products?.images?.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item} alt={products.title} className="w-100" />
                    </div>)
                })}
              </Slider>

            </div>
          </div>
          <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12">
            <div className="layer">
              <h2 className="mb-3 fw-bold">{products.title}</h2>

              <div className="mt-3 d-flex justify-content-between">
                <div>
                  <p className="fw-bold">{products.price} <span className="text-main">EGP</span></p>
                </div>

                <div>
                  <i className="fa-solid fa-star pe-1 rating-color"></i>
                  {products.ratingsAverage}
                </div>

              </div>
              <p className="text-muted border-bottom border-secondary pb-2">{products.description}</p>
              <div className="colors-container d-flex mt-3">
                <span className="fw-bold">Colours: </span>
                <ul className="colors">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>

              </div>
              <div className="sizes-container d-flex mt-2">
                <span className="fw-bold">Sizes: </span>
                <ul className="sizes">
                  <li>XS</li>
                  <li>S</li>
                  <li>M</li>
                  <li>L</li>
                  <li>XL</li>
                </ul>

              </div>
              <p className="fw-bold text-dark">Brand: <span className="text-muted">{products?.brand?.name}</span></p>
              <p className="fw-bold text-dark">Category: <span className="text-muted"><span>{products?.category?.name}</span></span></p>
              <p className="fw-bold text-dark">Quantity: <span className="text-muted"><span>{products?.quantity}</span></span></p>
              {/* <p className="fw-bold text-dark">Ratings Quantity: <span className="text-muted"><span>{products?.ratingsQuantity}</span></span></p> */}

              <div className="services">
                <div className="mt-3 delivery d-flex align-content-center border border-2 border-secondary rounded-1 p-2">
                  <div className="d-flex justify-content-center align-content-center h-100">
                    <img className="mt-3" src={Deliveryar} alt="" />
                  </div>
                  <div className="text-delivery ms-3">
                    <h6 className="fw-bold">Free Delivery</h6>
                    <p >Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="mt-3 delivery d-flex align-content-center border border-2 border-secondary rounded-1 p-2">
                  <div className="d-flex justify-content-center align-content-center h-100">
                    <img className="mt-3" src={Return} alt="" />
                  </div>
                  <div className="text-delivery ms-3">
                    <h6 className="fw-bold">Return Delivery</h6>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
              <button
                // disabled={!loading}
                onClick={onlineInBtn}
                className="w-100 btn bg-main btn-main text-white mt-3"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-plus"></i> Add To Cart
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-spinner fa-spin-pulse me-1"></i> Add To Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
