import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import BackGround from "../Assets/Images/light-patten.svg";


export default function MainLayout() {
  return (
    <>
      <img
        src={BackGround}
        alt="backGround"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          top: "0",
          left: "0",
          right: "0",
          objectFit: "cover",
        }}
      />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}
