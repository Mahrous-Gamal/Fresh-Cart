import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationLayout from "./Layout/AuthenticationLayout";
import MainLayout from "./Layout/MainLayout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import NotFound from "./Components/NotFound/NotFound";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import BeforeRegistering from "./Layout/BeforeRegistering";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import { Offline } from "react-detect-offline";
import GetAllSubCategoriesOnCategory from "./Components/Get All SubCategories On Category/GetAllSubCategoriesOnCategory";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Address from "./Components/Address/Address";
import Orders from "./Components/Orders/Orders";
import Wishlist from "./Components/Wishlist/Wishlist";
import Profile from "./Components/Profile/Profile";
import UpdateData from "./Components/UpdateData/UpdateData";
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import ScrollButton from "./Components/ScrollButton/ScrollButton";
import { MdOutlineWifiOff } from "react-icons/md";
import WishlistContextProvider from "./Context/WishlistContext.js";

export default function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <BeforeRegistering />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Signin />
            </ProtectedRoute>
          ),
        },
        {
          path: "signin",
          element: (
            <ProtectedRoute>
              <Signin />
            </ProtectedRoute>
          ),
        },
        {
          path: "signup",
          element: (
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          ),
        },
        {
          path: "forgetPass",
          element: (
            <ProtectedRoute>
              <ForgetPassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "verifyResetCode",
          element: (
            <ProtectedRoute>
              <VerifyResetCode />
            </ProtectedRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <ProtectedRoute>
              <BrandsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <ProtectedRoute>
              <GetAllSubCategoriesOnCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "UpdateData",
          element: (
            <ProtectedRoute>
              <UpdateData />
            </ProtectedRoute>
          ),
        },
        {
          path: "UpdatePass",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
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

      <ToastContainer theme="light" autoClose={1000} />

      <Offline>
        <div className="offline d-flex justify-content-center align-items-center ">
          <MdOutlineWifiOff className="me-2 fs-5" /> You are currently offline{" "}
          <p className="m-0 ms-2"></p>
        </div>
      </Offline>

      <ScrollButton />
    </>
  );
}
