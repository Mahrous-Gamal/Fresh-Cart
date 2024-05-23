import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function CartSon({ item, refetch }) {

  let { updateCart, deleteCart, setCounter } = useContext(CartContext);

  async function deletCartt(id) {

    let deleteCartItem = await deleteCart(id)

    if (deleteCartItem?.data?.status === "success") {

      toast.success("Product removed from your cart")
      setCounter(deleteCartItem?.data?.numOfCartItems)

      await refetch()
    } else {
      toast.error("Deletion error")
    }
  }


  async function updateCartItem(id, count) {


    let dataOfupdate = await updateCart(id, count)

    if (dataOfupdate?.data?.status === "success") {

      toast.success("The update succeeded")
      setCounter(dataOfupdate?.data?.numOfCartItems)

      await refetch()

    } else {
      toast.error("Error updating")
    }
  }


  return (
    <>
      <div className="row py-2 my-3 g-3 bg-main-light m-auto border mt-5">
        <div className="col-md-1">
          <img src={item.product.imageCover} className="w-100" alt="" />
        </div>

        <div className="col-md-11 d-flex justify-content-between">
          <div>
            <p className="mb-2">{item.product.title}</p>
            <p className="text-main mb-2">Price : {item.price} <span className='text-main'>EGP</span></p>
            <button
              onClick={() => deletCartt(item.product._id)}
              className="btn btn-danger text-white"
            >
              <i className="fa-solid fa-trash-can pe-2"></i>
              Remove
            </button>
          </div>
          <div className="d-flex align-items-center">
            <button
              onClick={() => updateCartItem(item.product._id, item.count + 1)}
              className="btn btn-main bg-main text-white fs-2 py-0"
            >
              +
            </button>
            <span className="px-2">{item.count}</span>
            <button
              disabled={item.count <= 1}
              onClick={() => updateCartItem(item.product._id, item.count - 1)}
              className="btn btn-main bg-main text-white fs-2 py-0"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
