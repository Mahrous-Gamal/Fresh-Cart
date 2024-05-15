import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import axios from 'axios';
import BrandDetalSon from './BrandDetalSon';
import { WishlistContext } from '../../Context/WishlistContext';


export default function BrandsDetails() {

  let { getWishlist } = useContext(WishlistContext);

  const [final, setFinal] = useState(null);
  const [arr, setArr] = useState(0);
  const id = useParams();

  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const datapro = useQuery('getProduct', getProduct);
  const product = datapro?.data?.data?.data;

  let { data: wishlistData, refetch } = useQuery("getWish", getWishlist);

  let Arr = wishlistData?.data?.data?.map((item) => item._id);


  useEffect(() => {
    if (product) {
      const filteredItems = product.filter(ele => ele.brand._id === id.id);
      if (filteredItems?.length > 0) {
        const jsxElements = filteredItems.map((item) => (
          <BrandDetalSon
            key={item._id}
            item={item}
            arrIdWish={Arr}
            refetch={refetch}
          />
        ));
        setFinal(jsxElements);
        setArr(1);
      } else {
        setFinal(<h1 className='text-center mt-4'>No items found</h1>);
        setArr(0)
      }
    }
  }, [id.id, product, wishlistData]);


  // if (datapro.isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <div
        className="container mt-4 "
        style={{ paddingTop: "195.49px", paddingBottom: "150px" }}
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
