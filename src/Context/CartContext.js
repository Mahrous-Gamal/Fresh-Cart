import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [counter, setCounter] = useState(0);

  const userId = null;

  let userToken = localStorage.getItem("token");
  let headers = {
    token: userToken,
  };

  /**********************************<<addToCart>>********************************productId**/
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);

    // setNumberOfCartItems(response.numOfCartItems);
  }

  /**********************************<<getCart>>**********************************/
  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers: headers })
      .then((response) => response)
      .catch((error) => error);
  }

  /**********************************<<deletCart>>**********************************/
  function deleteCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  /**********************************<<updatetCart>>********************************count**/
  function updateCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  /**********************************<<deletAllCart>>**********************************/
  function deleteAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  /**********************************<<pay>>**********************************/
  function pay(id, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  /**************************************************************************************/

  return (
    <CartContext.Provider
      value={{
        counter,
        setCounter,

        userId,

        addToCart,
        getCart,
        deleteCart,
        updateCart,
        deleteAllCart,

        pay,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
