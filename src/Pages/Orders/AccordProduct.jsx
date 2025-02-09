import React from 'react'

export default function AccordProduct({ ele }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-3 rounded-3 shadow">
      <div className="layer">
        <img
          src={ele.product.imageCover}
          className="w-100"
          alt={ele.product.category.name}
        />
        <div className='p-2'>
          <span className="text-main">{ele.product.category.name}</span>
          <h5 className="mt-3">
            {ele.product.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <h6>pieces: {ele.count}</h6>
          <div className="d-flex justify-content-between">
            <div>
              <p>{ele.price} <span className='text-main'>EGP</span></p>
            </div>
            <div>
              <i className="fa-solid fa-star pe-1 rating-color"></i>
              {ele.product.ratingsAverage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
