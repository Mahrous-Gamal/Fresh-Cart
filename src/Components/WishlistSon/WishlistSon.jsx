import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import BigLoader from "../BigLoader/BigLoader";


export default function WishlistSon(props) {
  let {
    setCounter,
    addToCart,
    DeleteWishlist,
    setWishlistCounter,
    block,
    setBlock,
  } = useContext(storeContext);
  let [loading, setLoading] = useState(1);
  const item = props.item;


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
  async function addproductToCart(productId) {
    setLoading(0);
    let { data } = await addToCart(productId);
    if (data?.status === "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setLoading(1);
    }
  }
  async function DeleteToWash(productId) {
    setBlock("block");
    let { data } = await DeleteWishlist(productId);
    if (data?.status == "success") {
      toast.success("Product Deleted successfully");
      setWishlistCounter(data?.data?.length);
      await props.refetch();
      await setBlock("none");
    }
  }

  return (
    <>
      <BigLoader state={block} />
      <div className="col-lg-2 col-md-3 col-sm-6 position-relative my-3">
        <div className="product p-3 rounded-3 cursor-pointer position-relative">
          <i
            onClick={() => {
              isOnline
                ? DeleteToWash(props.item._id)
                : toast.error("You are offline now");
            }}
            className="fa-solid fa-heart text-danger"
          ></i>
          <Link to={`/product-delales/${item._id}`}>
            <img src={item.imageCover} className="w-100" alt="imageCover" />
            <span className="text-main">{item.category.name}</span>
            <h5 className="mt-3">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between">
              <div>
                <p>{item.price}EGP</p>
              </div>
              <div>
                <i className="fa-solid fa-star pe-1 rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            disabled={!loading}
            onClick={() => {
              isOnline
                ? addproductToCart(props.item._id)
                : toast.error("You are offline now");
            }}
            className="btn bg-main w-100 text-white"
          >
            {loading ? (
              <>
                Add
                <i className="fa-solid fa-cart-shopping ps-2" />
              </>
            ) : (
              "Loading..."
            )}
          </button>
        </div>
      </div>
    </>
  );
}
