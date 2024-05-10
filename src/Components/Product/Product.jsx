import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import BigLoader from "../BigLoader/BigLoader";
import StarRating from "../StarRating/StarRating";
import "./Product.css";


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
    if (data?.status === "success") {
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
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 position-relative my-3">
        <div className="product">
          <div className="product-img">
            <img src={item.imageCover} className="w-100" alt="imageCover" />
          </div>
          <div className="product-txt text-start mt-2 fw-bold">
            <h2 className="general-color fs-5">{item.category.name}</h2>
            <p>Mens Winter Leathers Jackets</p>
            <div className="d-flex justify-content-between">
              <StarRating ratingsAverage={item.ratingsAverage} />

              {item.ratingsAverage}
            </div>
            <p>
              {" "}
              <span className="text-main me-1">{item.price}{" "}</span>
              <del className="text-secondary">{item.price + 100}</del>
            </p>
          </div>

          <ul className="product-icons">
            <li>
              <i
                class="fa-solid fa-cart-shopping"
                onClick={() => addproductToCart(item._id)}
              ></i>
            </li>
            <li>
              <i
                class="fa-regular fa-heart"
                onClick={() => chiking()}
                className={`${arrIdWish?.includes(props?.item?._id.toString())
                  ? "fa-solid fa-heart text-danger"
                  : "fa-regular fa-heart"
                  }`}
              ></i>
            </li>
            <li>
              <Link to={`/product-delales/${item._id}`}>
                <i className="fa-solid fa-eye"></i>
              </Link>
            </li>
            {/* <li>
              <i className="fa-solid fa-code-compare"></i>
            </li> */}
          </ul>
          {/* <button
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
          </button> */}
        </div>
      </div>
    </>
  );
}
