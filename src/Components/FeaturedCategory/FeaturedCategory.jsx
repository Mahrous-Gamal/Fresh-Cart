import React from "react";
import { Link } from "react-router-dom";


export default function Category({ item }) {
  return (
    <div className="col-md-12">
      <Link to={`/categories/${item._id}`}>
        <img src={item.image} alt={item.name} width="100%" style={{ height: "200px" }} />
        <p className="h6">{item.name}</p>
      </Link>
    </div>
  );
}
