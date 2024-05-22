import "./App.css";
import BeforeRegistering from "./Layout/BeforeRegistering";
import AuthenticationLayout from "./Layout/AuthenticationLayout";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home.jsx";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import { Offline } from "react-detect-offline";
import GetAllSubCategoriesOnCategory from "./Components/Get All SubCategories On Category/GetAllSubCategoriesOnCategory";
import BrandsDetails from "./Pages/BrandsDetails/BrandsDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Address from "./Pages/Address/Address";
import Orders from "./Pages/Orders/Orders";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Profile from "./Pages/Profile/Profile";
import ScrollButton from "./Components/ScrollButton/ScrollButton";
import { MdOutlineWifiOff } from "react-icons/md";
import WishlistContextProvider from "./Context/WishlistContext.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <BeforeRegistering />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <WelcomePage />
            // </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <AuthenticationLayout />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          ),
        },
        {
          path: "signin",
          element: (
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          ),
        },
        {
          path: "signup",
          element: (
            // <ProtectedRoute>
            <Register />
            // </ProtectedRoute>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            // <ProtectedRoute>
            <ForgetPassword />
            // </ProtectedRoute>
          ),
        },
        {
          path: "verifyResetCode",
          element: (
            // <ProtectedRoute>
            <VerifyResetCode />
            // </ProtectedRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            // <ProtectedRoute>
            <ResetPassword />
            // </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            // <ProtectedRoute>
            <Products />
            // </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            // <ProtectedRoute>
            <Cart />
            // </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            // <ProtectedRoute>
            <Wishlist />
            // </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            // <ProtectedRoute>
            <Categories />
            // </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            // <ProtectedRoute>
            <Brands />
            // </ProtectedRoute>
          ),
        },
        {
          path: "brands/:id",
          element: (
            // <ProtectedRoute>
            <BrandsDetails />
            // </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            // <ProtectedRoute>
            <ProductDetails />
            // </ProtectedRoute>
          ),
        },
        {
          path: "categories/:id",
          element: (
            // <ProtectedRoute>
            <GetAllSubCategoriesOnCategory />
            // </ProtectedRoute>
          ),
        },
        {
          path: "address/:id",
          element: (
            // <ProtectedRoute>
            <Address />
            // </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            // <ProtectedRoute>
            <Orders />
            // </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routers} />
        </WishlistContextProvider>
      </CartContextProvider>

      <Offline>
        <div className="offline d-flex justify-content-center align-items-center ">
          <MdOutlineWifiOff className="me-2 fs-5" /> You are currently offline{" "}
          <p className="m-0 ms-2"></p>
        </div>
      </Offline>

      <ToastContainer theme="light" autoClose={1000} />

      <ScrollButton />
    </>
  );
}
