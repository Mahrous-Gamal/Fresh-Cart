import React from "react";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-body-tertiary text-muted">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
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
            </div>

            <div className="col-xl-2  col-md-3 mx-auto mb-4">
              {/* Links */}
              <h6 className="fw-bold mb-4 text-dark">Account</h6>
              <p>
                <Link to="" className="text-reset">
                  My Account
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  Login / Register
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  Cart
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  Wishlist
                </Link>
              </p>
            </div>

            <div className="col-xl-2 col-md-3 mx-auto mb-4">
              {/* Links */}
              <h6 className="fw-bold mb-4 text-dark">Quick Link</h6>
              <p>
                <Link to="" className="text-reset">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  FAQ
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  Terms Of Use
                </Link>
              </p>
              <p>
                <Link to="" className="text-reset">
                  Contact
                </Link>
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
