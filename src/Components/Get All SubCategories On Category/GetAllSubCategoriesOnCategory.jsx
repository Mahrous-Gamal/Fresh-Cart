import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
// import GetAllSubCategoriesOnCategorySon from './GetAllSubCategoriesOnCategorySon';
import Product from '../Product/Product';
import { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import NoItems from "../../Assets/Images/noCatProducts.svg"


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
        setFinal(<div className="text-center fs-2 fw-bold">
          <img src={NoItems} className='w-100 image-notfound' style={{ height: "88vh" }} alt="" />
          <p>No items found</p>
        </div>);
        setArr(0)
      }
    }
  }, [id.id, product, dataWish]);

  return (
    <>
      <div
        className="container my-3"
        style={{ paddingTop: "60.49px", paddingBottom: "40px" }}

      >        <div className='row'>
          {final}
        </div>
      </div>
      {/* {arr ? "" : <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}>
      <Footer />
    </div>} */}
    </>
  );
}
