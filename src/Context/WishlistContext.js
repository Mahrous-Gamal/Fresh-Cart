import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

  let [wishlistCounter, setWishlistCounter] = useState(0);

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
    <WishlistContext.Provider
      value={{
        wishlistCounter,
        setWishlistCounter,

        addToWishlist,
        getWishlist,
        DeleteWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
