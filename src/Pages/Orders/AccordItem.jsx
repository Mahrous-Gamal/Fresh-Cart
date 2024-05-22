import React from 'react'
import AccordProduct from './AccordProduct';
import Accordion from "react-bootstrap/Accordion";

export default function AccordItem({ item, idx }) {

  function detalisDate(data) {
    const dateObject = new Date(data);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return (
    <Accordion.Item eventKey={idx - 1}>


      <Accordion.Header>
        <span className='fw-bold me-1'>Order </span> <span className='text-main fw-bold'>{idx}</span> , ID:#{item.id}
      </Accordion.Header>


      <Accordion.Body>
        <h2 className="mb-4 text-center fs-4 fw-bold">
          Total Order Price:
          <span className="text-main ms-2">{item?.totalOrderPrice}</span>
        </h2>
        <div className="text-center">
          <p className="mb-2">{detalisDate(item.updatedAt)}</p>
          <p>
            Payment Method:{" "}
            <span className="bg-warning text-danger p-1 fw-bold">
              {item.paymentMethodType}
            </span>
          </p>
          <p className="d-flex justify-content-evenly">
            <p>
              Paid:{" "}
              {item.isPaid ? (
                <span className="text-main fw-bold">True</span>
              ) : (
                <span className="text-danger fw-bold">False</span>
              )}
            </p>
            <p>
              Delivered:{" "}
              {item.isDelivered ? (
                <span className="text-main fw-bold">True</span>
              ) : (
                <span className="text-danger fw-bold">False</span>
              )}
            </p>
          </p>
        </div>

        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex mb-3">
            <div className="me-3">
              <i className="fa-solid fa-user fs-2"></i>
            </div>
            <div>
              <h3 className='fw-bold'>Customer Info</h3>
              <p className="mb-1"><span className='fw-bold'>Name</span>: {item.user.name}</p>
              <p className="mb-1"><span className='fw-bold'>Email</span>: {item.user.email}</p>
              <p className="mb-1"><span className='fw-bold'>Phone</span>: {item.shippingAddress.phone}</p>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="me-3">
              <i className="fa-solid fa-cart-shopping fs-2"></i>
            </div>
            <div>
              <h3 className='fw-bold'>Order Info</h3>
              <p className="mb-1"><span className='fw-bold'>City</span>: {item.shippingAddress.city}</p>
              <p className="mb-1"><span className='fw-bold'>Phone</span>: {item.shippingAddress.phone}</p>
              <p className="mb-1"><span className='fw-bold'>Details</span>: {item.shippingAddress.details}</p>

            </div>
          </div>
        </div>


        <div className="row">
          {item?.cartItems?.map((ele) => {
            return <AccordProduct key={ele._id} ele={ele} />;
          })}
        </div>

      </Accordion.Body>
    </Accordion.Item>
  );
}
