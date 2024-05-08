import axios from "axios";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { storeContext } from "../../Context/StoreContext";
import { Helmet } from "react-helmet";


export default function Products() {
  let { getWishlist } = useContext(storeContext);
  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getProduct", getProduct);
  let { data: dataWish, refetch } = useQuery("getWish", getWishlist);
  let Arr = dataWish?.data?.data?.map((item) => item._id);
  // console.log(Arr);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-3" style={{ paddingTop: "74.49px" }}>
        <div className="row ">
          {data?.data?.data?.map((item) => {
            return (
              <Product
                item={item}
                key={item._id}
                arrIdWish={Arr}
                refetch={refetch}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}