import React, { useContext } from "react";
import { storeContext } from "../../Context/StoreContext";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import CartSon from "./CartSon";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";

export default function Cart() {
  let { getCart, deletAllCart, bosLoad, setBosLoad, setCounter } =
    useContext(storeContext);
  let { data, isLoading, refetch } = useQuery("cartQuery", getCart);

  async function deletAllCartt() {
    setBosLoad(true);
    let retDel = await deletAllCart();
    console.log(retDel);
    if (retDel?.data?.message == "success") {
      setBosLoad(false);
      setCounter(0);
      refetch();
    } else {
      toast.error("Deletion error");
      setBosLoad(false);
    }
  }

  if (!isLoading) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fresh Cart | Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div style={{ paddingTop: "74.49px" }}>
          <div className="container bg-main-light my-5 p-4">
            <h2>Shop Cart :</h2>
            <p className="text-main">
              Total Cart Price : {data?.data?.data?.totalCartPrice} EGP
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
                  disabled={bosLoad}
                  onClick={() => deletAllCartt()}
                  className="border-none btn btn-danger"
                >
                  {bosLoad ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <i className="fa-solid fa-trash-can pe-2"></i>Remove All
                    </>
                  )}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {data?.data?.data?.products ? (
            <Footer />
          ) : (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
              }}
            >
              <Footer />
            </div>
          )}
        </div>
      </>
    );
  }
  return <Loader />;
}
