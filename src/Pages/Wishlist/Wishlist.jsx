import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { useQuery } from "react-query";
// import WishlistSon from "../../Components/WishlistSon/WishlistSon";
import Product from "../../Components/Product/Product";
import { Helmet } from "react-helmet";
import Loader from './../../Components/Loader/Loader';
import WishlistEmpty from "../../Assets/Images/wishlist.svg"

export default function Wishlist() {

  let { wishlistCounter, getWishlist, setWishlistCounter } = useContext(WishlistContext);

  let { data, refetch, isLoading } = useQuery("getWish", getWishlist);

  let idProducts = data?.data?.data?.map((item) => item._id);

  setWishlistCounter(data?.data?.data?.length);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | My Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div
        className="container"

      >
        {wishlistCounter ? (
          <div className="row" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
            {data?.data?.data?.map((item) => {
              return (
                <Product
                  key={item._id}
                  item={item}
                  idWishlist={idProducts}
                  refetch={refetch}
                  wishlist={true}
                />
              );
            })}
          </div>
        ) : (

          <div className="text-center fs-5 fw-bold">
            <img src={WishlistEmpty} className='w-100 image-notfound' style={{ height: "88vh" }} alt="" />

            <p>Your wishlist is empty, add some products and come back later</p>
          </div>
        )
        }
      </div>
    </>
  );
}
