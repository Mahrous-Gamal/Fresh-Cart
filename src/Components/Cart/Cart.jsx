import React, { useContext } from "react";
import { useQuery } from "react-query";
import CartSon from "./CartSon";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { CartContext } from './../../Context/CartContext';


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

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div style={{ paddingTop: "74.49px" }}>
        <div className="container bg-main-light my-5 p-4">
          <h2 className="fw-bold">Cart</h2>
          <p className="text-main">
            Total Cart Price : {data?.data?.data?.totalCartPrice} <span className='text-main'>EGP</span>
          </p>

          {data?.data?.data?.products.map((item) => {
            return <CartSon key={item._id} item={item} refetch={refetch} />;
          })}

          {data?.data?.data?.products ? (
            <div className="m-4 d-flex justify-content-between">

            
              <Link
                to={`/address/${data?.data?.data?._id}`}
                className="border-main btn bg-main text-white "
              >
                Place Order
              </Link>

              <button
                onClick={() => deleteAllCartItems()}
                className="border-none btn btn-danger"
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
              <p className="fw-bold">Oops ! Your cart is empty, add some products to your cart and come back again</p>
            </>

          }
        </div>

      </div>
    </>
  );
}
