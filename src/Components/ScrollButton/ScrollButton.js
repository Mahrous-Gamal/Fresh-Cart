import React, { useState, useEffect } from "react";
import "./ScrollButton.css"; 


function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scrollBtn ${isVisible ? "visible" : ""} btn-goTop`}
      onClick={scrollToTop}
    >
      <i class="fa-regular fa-circle-up"></i>
    </div>
  );
}

export default ScrollButton;
