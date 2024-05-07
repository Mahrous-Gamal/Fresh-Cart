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
        Order {idx} , ID:#{item.id}
      </Accordion.Header>
      <Accordion.Body>
        <h2 className="mb-4 text-center fs-4">
          totalOrderPrice:
          <span className="text-main">{item?.totalOrderPrice}</span>
        </h2>
        <div className="text-center">
          <p className="mb-2">{detalisDate(item.updatedAt)}</p>
          <p>
            Payment Method:{" "}
            <span className="bg-warning text-danger p-1">
              {item.paymentMethodType}
            </span>
          </p>
          <p className="d-flex justify-content-evenly">
            <p>
              isPaid:{" "}
              {item.isPaid ? (
                <span className="text-main">True</span>
              ) : (
                <span className="text-danger">False</span>
              )}
            </p>
            <p>
              isDelivered:{" "}
              {item.isDelivered ? (
                <span className="text-main">True</span>
              ) : (
                <span className="text-danger">False</span>
              )}
            </p>
          </p>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex mb-3">
            <div className="me-3">
              <i className="fa-solid fa-user"></i>
            </div>
            <div>
              <h3>Customer Info</h3>
              <p className="mb-1">Name: {item.user.name}</p>
              <p className="mb-1">Email: {item.user.email}</p>
              <p className="mb-1">Phone: {item.shippingAddress.phone}</p>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="me-3">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div>
              <h3>Order Info</h3>
              <p className="mb-1">Details: {item.shippingAddress.details}</p>
              <p className="mb-1">City: {item.shippingAddress.city}</p>
              <p className="mb-1">Phone: {item.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {item?.cartItems?.map((ele) => {
            return <AccordProduct key={ele._id} ele={ele} />;
          })}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
