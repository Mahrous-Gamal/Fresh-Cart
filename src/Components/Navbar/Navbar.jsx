import { useContext, useEffect } from "react";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { LuUser } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";


export default function Navbar() {
  function clearLocalStorage() {
    localStorage.clear();
  }
  let {
    wishlistCounter,
    getWishlist,
    setWishlistCounter,
  } = useContext(WishlistContext);

  let {
    setCounter,
    counter,
    getCart,

  } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setCounter(data?.numOfCartItems);
      let dataWish = await getWishlist();
      setWishlistCounter(dataWish?.data?.data?.length);
    })();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item fit-content">
                <NavLink className="nav-link p-2" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item fit-content">
                <NavLink className="nav-link p-2" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item fit-content">
                <NavLink className="nav-link p-2" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item fit-content">
                <NavLink className="nav-link p-2" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item fit-content">
                <NavLink className="nav-link p-2" to="/allorders">
                  All orders
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-nav-icons ">
              <li>
                <NavLink
                  to="/profile"
                  className="a-nav nav-link-icon btn position-relative border-0"
                >
                  <LuUser className="fs-2" />
                  {/* hjbhjbj */}

                </NavLink>
                <NavLink
                  to="/wishlist"
                  className="a-nav nav-link-icon btn position-relative me-1 border-0"
                >
                  <FaRegHeart className="fs-3" />

                  {wishlistCounter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCounter}
                      <span className="visually-hidden"></span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
                <NavLink
                  to="/cart"
                  className="a-nav nav-link-icon btn position-relative me-2 border-0"
                >
                  <HiOutlineShoppingCart className="fs-3" />

                  {counter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden"></span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>

              <li className="nav-item ">
                <NavLink
                  onClick={clearLocalStorage}
                  className="nav-link pe-0"
                  to="/signin"
                >
                  LogOut
                  <i className="fa-solid fa-right-from-bracket ps-2"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
