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
import Signup from "./Components/Signup/Signup";
import Gard from "./Components/Gard/Gard";
import ProductDetales from "./Components/ProductDetails/ProductDetails";
import StoreContextProvider from "./Context/StoreContext";
import { ToastContainer } from "react-toastify";
import BeforeRegistering from "./Layout/BeforeRegistering";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import { Offline, Online } from "react-detect-offline";
import GetAllSubCategoriesOnCategory from "./Components/Get All SubCategories On Category/GetAllSubCategoriesOnCategory";
import BrandsDetal from "./Components/ProductDetails/ProductDetails";
import ForgetPass from "./Components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Handala from "./Components/Handala/Handala";
import Address from "./Components/Address/Address";
import Allorders from "./Components/Orders/Orders";
import Wishlist from "./Components/Wishlist/Wishlist";
import Profile from "./Components/Profile/Profile";
import UpdateData from "./Components/Update/UpdateData";
import UpdatePass from "./Components/Update/UpdatePass";
import ScrollButton from "./Components/ScrollButton/ScrollButton";
import { MdOutlineWifiOff } from "react-icons/md";


export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <BeforeRegistering />,
      children: [
        {
          index: true,
          element: (
            <Handala>
              <WelcomePage />
            </Handala>
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
            <Handala>
              <Signin />
            </Handala>
          ),
        },
        {
          path: "signin",
          element: (
            <Handala>
              <Signin />
            </Handala>
          ),
        },
        {
          path: "signup",
          element: (
            <Handala>
              <Signup />
            </Handala>
          ),
        },
        {
          path: "forgetPass",
          element: (
            <Handala>
              <ForgetPass />
            </Handala>
          ),
        },
        {
          path: "VerifyResetCode",
          element: (
            <Handala>
              <VerifyResetCode />
            </Handala>
          ),
        },
        {
          path: "ResetPassword",
          element: (
            <Handala>
              <ResetPassword />
            </Handala>
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
            <Gard>
              <Home />
            </Gard>
          ),
        },
        {
          path: "home",
          element: (
            <Gard>
              <Home />
            </Gard>
          ),
        },
        {
          path: "products",
          element: (
            <Gard>
              <Products />
            </Gard>
          ),
        },
        {
          path: "cart",
          element: (
            <Gard>
              <Cart />
            </Gard>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Gard>
              <Wishlist />
            </Gard>
          ),
        },
        {
          path: "categories",
          element: (
            <Gard>
              <Categories />
            </Gard>
          ),
        },
        {
          path: "brands",
          element: (
            <Gard>
              <Brands />
            </Gard>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <Gard>
              <BrandsDetal />
            </Gard>
          ),
        },
        {
          path: "product-delales/:id",
          element: (
            <Gard>
              <ProductDetales />
            </Gard>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <Gard>
              <GetAllSubCategoriesOnCategory />
            </Gard>
          ),
        },
        {
          path: "address/:id",
          element: (
            <Gard>
              <Address />
            </Gard>
          ),
        },
        {
          path: "allorders",
          element: (
            <Gard>
              <Allorders />
            </Gard>
          ),
        },
        {
          path: "profile",
          element: (
            <Gard>
              <Profile />
            </Gard>
          ),
        },
        {
          path: "UpdateData",
          element: (
            <Gard>
              <UpdateData />
            </Gard>
          ),
        },
        {
          path: "UpdatePass",
          element: (
            <Gard>
              <UpdatePass />
            </Gard>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>

      <ToastContainer theme="colored" autoClose={1000} />

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
