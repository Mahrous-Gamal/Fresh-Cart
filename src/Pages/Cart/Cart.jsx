import React, { useContext } from "react";
import { useQuery } from "react-query";
import CartSon from "./CartSon";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { CartContext } from './../../Context/CartContext';
import { GiShoppingCart } from "react-icons/gi";
// import "../../Pages/Cart/"
import EmptyCart from "../../Assets/Images/cart.svg"
import Loader from './../../Components/Loader/Loader';

export default function Cart() {

  let { getCart, deleteAllCart, setCounter } = useContext(CartContext);

  let { data, refetch, isLoading } = useQuery("cartQuery", getCart);

  async function deleteAllCartItems() {

    let retDel = await deleteAllCart();

    if (retDel?.data?.message === "success") {
      setCounter(0);
      refetch();
      toast.success("All products removed from your cart");

    } else {

      toast.error("Deletion error");

    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container"

      >
        <div className="container px-0">


          {
            data?.data?.data?.products && (
              <>
                <div className="cart d-flex justify-content-between" style={{ paddingTop: "100.49px" }}>
                  <h2 className="fw-bold"> <GiShoppingCart className="text-main fs-1 fw-bold rotated mb-2"
                    style={{
                      transform: "rotatey(180deg)"
                    }} /><span>Cart</span></h2>
                  <p className="text-muted fw-bold fs-5">
                    Total Price : {data?.data?.data?.totalCartPrice} <span className='text-main'>EGP</span>
                  </p>
                </div>

              </>
            )
          }


          {data?.data?.data?.products.map((item) => {
            return <CartSon key={item._id} item={item} refetch={refetch} />;
          })}

          {data?.data?.data?.products ? (
            <div className="d-flex justify-content-between mb-5" >

              <Link
                to={`/address/${data?.data?.data?._id}`}
              >
                <button className="btn btn-main bg-main text-white">Place Order</button>
              </Link>

              <button
                onClick={() => deleteAllCartItems()}
                className="btn btn-danger"
              >
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <i className="fa-solid fa-trash-can pe-2"></i>Remove All
                  </>
                )}
              </button>
            </div>
          ) :
            <>
              <div className="text-center fs-5 fw-bold">
                <img src={EmptyCart} className='w-100 image-notfound' style={{ height: "88vh" }} alt="" />
                <p>Oops ! Your cart is empty, add some products to your cart and come back again</p>
              </div>

            </>

          }
        </div>

      </div>
    </>
  );
}
