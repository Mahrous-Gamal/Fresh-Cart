import React from 'react';

const StarRating = ({ ratingsAverage }) => {
  const solidStars = Math.floor(ratingsAverage); // Number of solid stars
  const remainingStar = 5 - solidStars; // Number of regular stars
  
  // Array to hold the JSX elements for solid stars
  const solidStarsArray = Array.from({ length: solidStars }, (_, index) => (
    <i key={index} className="fa-solid fa-star start"></i>
  ));
  
  // Array to hold the JSX elements for regular stars
  const remainingStarsArray = Array.from({ length: remainingStar }, (_, index) => (
    <i key={index + solidStars} className="fa-regular fa-star start"></i>
  ));

  return (
    <p>
      {solidStarsArray} {remainingStarsArray}
    </p>
  );
};

export default StarRating;
