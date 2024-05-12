import React from 'react'
import WelcomePage from '../WelcomePage/WelcomePage'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import Products from '../Products/Products';
import { Helmet } from "react-helmet";


export default function Home() {
  return (
    <>


      <WelcomePage />
      <FeaturedProduct />
      <Products />




      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  )
}
