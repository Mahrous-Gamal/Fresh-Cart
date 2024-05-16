import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { useQuery } from "react-query";
import WishlistSon from "../WishlistSon/WishlistSon";
import { Helmet } from "react-helmet";


export default function Wishlist() {

  let { wishlistCounter, getWishlist, setWishlistCounter } = useContext(WishlistContext);

  let { data, refetch } = useQuery("getWish", getWishlist);

  let idProducts = data?.data?.data?.map((item) => item._id);

  setWishlistCounter(data?.data?.data?.length);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | My Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container my-5"
        style={{ paddingTop: "74.49px", paddingBottom: "40px" }}
      >
        {wishlistCounter ? (
          <div className="row">
            {data?.data?.data?.map((item) => {
              return (
                <WishlistSon
                  key={item._id}
                  item={item}
                  idWishlist={idProducts}
                  refetch={refetch}
                />
              );
            })}
          </div>
        ) : (

          <div className="mt-4 text-center fs-5 fw-bold">Your wishlist is empty, add some products and come back later</div>
        )
        }
      </div>
    </>
  );
}
