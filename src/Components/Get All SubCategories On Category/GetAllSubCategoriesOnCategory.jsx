import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
// import GetAllSubCategoriesOnCategorySon from './GetAllSubCategoriesOnCategorySon';
import Product from '../Product/Product';
import { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';


export default function GetAllSubCategoriesOnCategory() {

  let { getWishlist } = useContext(WishlistContext);

  const [final, setFinal] = useState(null);
  const [arr, setArr] = useState(0);
  const id = useParams();

  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const datapro = useQuery('getProduct', getProduct);
  const product = datapro?.data?.data?.data;

  let { data: dataWish, refetch } = useQuery("getWish", getWishlist);
  let idProducts = dataWish?.data?.data?.map((item) => item._id);

  useEffect(() => {
    if (product) {
      const filteredItems = product.filter(ele => ele.category._id === id.id);

      if (filteredItems?.length > 0) {
        const jsxElements = filteredItems.map((item) => (
          <Product
            key={item._id}
            item={item}
            arrIdWish={idProducts}
            refetch={refetch}
            wishlist={false}

          />
        ));
        setFinal(jsxElements);
        setArr(1);
      } else {
        setFinal(<h1 className='text-center mt-4'>No items found</h1>);
        setArr(0)
      }
    }
  }, [id.id, product, dataWish]);

  return (
    <>
      <div
        className="container mt-4 "
        style={{ paddingTop: "195.49px", paddingBottom: "150px" }}
      >
        <div className='row'>
          {final}
        </div>
      </div>

    </>
  );
}
