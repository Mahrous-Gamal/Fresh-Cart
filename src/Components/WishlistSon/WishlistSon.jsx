import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import BigLoader from "../BigLoader/BigLoader";


export default function WishlistSon(props) {
  let {
    DeleteWishlist,
    setWishlistCounter,
  } = useContext(WishlistContext);

  let {
    setCounter,
    addToCart,
  } = useContext(CartContext);

  let [loading, setLoading] = useState(1);
  const item = props.item;

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
    setLoading(0);

    let { data } = await addToCart(productId);

    if (data?.status === "success") {
      toast.success("Product added to your cart");
      setCounter(data.numOfCartItems);
      // Loading
      setLoading(1);
    }
  }
  /****************************************************************/

  async function DeleteToWash(productId) {


    let { data } = await DeleteWishlist(productId);

    if (data?.status === "success") {
      toast.success("Product removed from your wishlist");
      setWishlistCounter(data?.data?.length);

      await props.refetch();

    }
  }

  return (
    <>

      <div className="col-lg-3 col-md-4 col-sm-6 position-relative my-3">
        <div className="product p-3 rounded-3 cursor-pointer position-relative shadow">
          <i
            onClick={() => {
              isOnline ? DeleteToWash(props.item._id) : toast.error("You are offline now");
            }}
            className="fa-solid fa-heart text-danger"
          ></i>

          <Link to={`/product-details/${item._id}`}>

            <img src={item.imageCover} className="w-100" alt="imageCover" />
            <span className="text-main">{item.category.name}</span>
            <h5 className="mt-3">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between">
              <div>
                <p>{item.price}<span className="text-main">EGP</span> </p>
              </div>
              <div>
                <i className="fa-solid fa-star pe-1 rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>

          <button
            onClick={() => {
              isOnline ? addproductToCart(props.item._id) : toast.error("You are offline now");
            }}
            className="btn bg-main w-100 text-white"
          >
            {loading ? (
              <>
                Add <i className="fa-solid fa-cart-shopping ps-2" />
              </>
            ) : (
              <>

                <i className="fa-solid fa-spinner fa-spin-pulse me-1"></i>
                <i className="fa-solid fa-cart-shopping ps-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
