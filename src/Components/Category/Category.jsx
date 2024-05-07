import React from "react";
import { Link } from "react-router-dom";


export default function Category({ item }) {
  return (
    <div className="colomns-son position-relative">
      <Link to={`/categories/${item._id}`}>
        <img src={item.image} alt={item.name} className="w-100" />
        <p className="p-2 position-absolute colomns-son-style">{item.name}</p>
      </Link>
    </div>
  );
}
