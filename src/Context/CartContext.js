import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext(0);

export default function CartContextProvider({ children }) {
  // let [numberOfCartItems, setNumberOfCartItems] = useState(0);
  let [counter, setCounter] = useState(0);

  const userId = null;

  /**********************************<<addToCart>>********************************productId**/
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);

    // setNumberOfCartItems(response.numOfCartItems);
  }

  /**********************************<<getCart>>**********************************/
  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  /**********************************<<deletCart>>**********************************/
  function deletCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  /**********************************<<updatetCart>>********************************count**/
  function updatetCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  /**********************************<<deletAllCart>>********************************count**/
  function deletAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  /**********************************<<pay>>********************************count**/
  function pay(id, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://fresh-cart.vercel.app/cart`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  /**************************************************************************************/

  return (
    <cartContext.Provider
      value={{
        counter,
        setCounter,

        userId,

        addToCart,
        getCart,
        deletCart,
        updatetCart,
        deletAllCart,

        pay,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
