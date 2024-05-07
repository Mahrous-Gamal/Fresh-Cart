import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import BigLoader from "../BigLoader/BigLoader";

export default function Product(props) {
  let {
    setCounter,
    addToCart,
    addToWishlist,
    setWishlistCounter,
    DeleteWishlist,
    block,
    setBlock,
  } = useContext(storeContext);
  let [loading, setLoading] = useState(1);
  let arrIdWish = props?.arrIdWish;
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
  async function addToWash(productId) {
    setBlock("block");
    let { data } = await addToWishlist(productId);
    // console.log(data);
    if (data?.status == "success") {
      toast.success("Product added successfully");
      setWishlistCounter(data?.data?.length);
      await props.refetch();
      await setBlock("none");
    }
  }
  async function DeleteToWash(productId) {
    setBlock("block");
    let { data } = await DeleteWishlist(productId);
    // console.log(data);
    if (data?.status == "success") {
      toast.success("Product Deleted successfully");
      setWishlistCounter(data?.data?.length);
      await props.refetch();
      await setBlock("none");
    }
  }
  function chiking() {
    if (isOnline) {
      if (!arrIdWish?.includes(item?._id.toString())) {
        addToWash(item._id);
      } else {
        DeleteToWash(item._id);
      }
    } else {
      toast.error("You are offline now");
    }
  }

  return (
    <>
      <BigLoader state={block} />
      <div className="col-lg-2 col-md-3 col-sm-6 position-relative my-3">
        <div className="product p-3 rounded-3 cursor-pointer position-relative">
          <i
            onClick={() => chiking()}
            className={`${
              arrIdWish?.includes(props?.item?._id.toString())
                ? "fa-solid fa-heart text-danger"
                : "fa-regular fa-heart"
            }`}
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
            onClick={() => addproductToCart(item._id)}
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
