import React from "react";
import Slider from "react-slick";
import Slider1 from "../../Assets/Images/slider-image-1.jpg";
import Slider2 from "../../Assets/Images/slider-image-2.jpg";
import Slider3 from "../../Assets/Images/slider-image-3.jpg";
import Slider4 from "../../Assets/Images/slider-image-4.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 550,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1550,
  };
  return (
    <Slider {...settings}>
      <div>
        <img src={Slider1} alt="sliderImage" className="w-100" height={550} />
      </div>

      <div>
        <img src={Slider2} alt="sliderImage" className="w-100" height={550} />
      </div>

      <div>
        <img src={Slider3} alt="sliderImage" className="w-100" height={550} />
      </div>
      <div>
        <img src={Slider4} alt="sliderImage" className="w-100" height={550} />
      </div>
    </Slider>
  );
}
