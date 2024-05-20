import axios from "axios";
import Product from "../../Components/Product/Product";
import { useQuery } from "react-query";
import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { Helmet } from "react-helmet";
import React from 'react';

export default function Products() {

  let { getWishlist } = useContext(WishlistContext);

  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data } = useQuery("getProduct", getProduct);
  let { data: dataWish, refetch } = useQuery("getWish", getWishlist);

  let idProducts = dataWish?.data?.data?.map((item) => item._id);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container my-3" style={{ paddingTop: "74.49px" }}>
        <div className="row ">
          {data?.data?.data?.map((item) => {
            return (
              <Product
                item={item}
                key={item._id}
                arrIdWish={idProducts}
                refetch={refetch}
                wishlist={false}

              />
            );
          })}
        </div>
      </div>
    </>
  );
}