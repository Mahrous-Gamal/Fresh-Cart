import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext = createContext(0);

export default function WishlistContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  let [wishlistCounter, setWishlistCounter] = useState(0);

  const userId = null;

  /**********************************<<addToWishlist>>********************************productId**/
  function addToWishlist(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  /**********************************<<getWishlist>>**********************************/

  function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  /**********************************<<DeleteWishlist>>**********************************/

  function DeleteWishlist(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  /**************************************************************************************/

  return (
    <wishlistContext.Provider
      value={{
        counter,
        setCounter,

        wishlistCounter,
        setWishlistCounter,

        userId,

        addToWishlist,
        getWishlist,
        DeleteWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
