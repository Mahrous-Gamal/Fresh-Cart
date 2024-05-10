import React from "react";
import logo from "../../Assets/Images/freshcart-logo.svg";
import Payment1 from "../../Assets/Images/Amazon_Pay.wine.svg"
import Payment2 from "../../Assets/Images/American-Express.webp"
import Payment3 from "../../Assets/Images/MasterCard.png"
import Payment4 from "../../Assets/Images/Paypal.png"


export default function Footer() {
  return (
    <footer className="ext-muted" style={{ backgroundColor: "rgb(238, 238, 238)" }}>
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-2 border-muted">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.linkedin.com/in/mahrous-gamal-044693218/"
            className="me-4 text-reset"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-linkedin-in fs-5"></i>
          </a>
          <a
            href="https://github.com/Mahrous-Gamal"
            className="me-4 text-reset fs-5"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100041500743911"
            className="me-4 text-reset fs-5"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/MahrousGama1"
            className="text-reset fs-5"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-x-twitter fs-5"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container mt-5">
          <div className="row mt-3">
            <div className="col-xl-4 col-md-12 mx-auto mb-4">
              {/* Content */}
              <h6 className="fw-bold fs-4 mb-4">
                <img src={logo} alt="logo" />
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
              <div className="payment">
                <span>Payment Partners</span>
                <img src={Payment1} style={{ width: "90px" }} alt="" />
                <img src={Payment2} className="mx-2" style={{ width: "45px" }} alt="" />
                <img src={Payment3} style={{ width: "45px" }} alt="" />
                <img src={Payment4} className="mx-2" style={{ width: "60px" }} alt="" />
              </div>
            </div>

            <div className="col-xl-2  col-md-3 mx-auto mb-4">
              {/* Links */}
              <h6 className="fw-bold mb-4 text-dark">Account</h6>
              <p className="cursor-pointer">
                My Account
              </p>

              <p className="cursor-pointer">
                Login / Register
              </p>

              <p className="cursor-pointer">
                Cart
              </p>

              <p className="cursor-pointer">
                Wishlist
              </p>

            </div>

            <div className="col-xl-2 col-md-3 mx-auto mb-4">
              {/* Links */}
              <h6 className="fw-bold mb-4 text-dark">Quick Link</h6>

              <p className="cursor-pointer">
                Privacy Policy
              </p>

              <p className="cursor-pointer">
                FAQ
              </p>

              <p className="cursor-pointer">
                Terms Of Use
              </p>

              <p className="cursor-pointer">
                Contact
              </p>

            </div>

            <div className="col-xl-4 col-md-6 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="fw-bold mb-4 text-dark">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i>Assiut, Egypt
              </p>
              <p>
                <i className="fas fa-envelope me-3 "></i>
                mahrous.gamal@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3 "></i>0100 144 9752
              </p>
              <p>
                <i class="fa-solid fa-comment-sms me-3 "></i>0111 222 3333
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © Copyright 2024
        <a
          className="text-reset fw-bold"
          href="https://mahrousgamal.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          <span> Mahrous Gamal</span>
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
}
