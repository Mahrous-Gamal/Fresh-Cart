import React from 'react'
import WelcomePage from '../../Components/WelcomePage/WelcomePage'
import Products from '../../Pages/Products/Products';
import { Helmet } from "react-helmet";
import Categories from '../../Pages/Categories/Categories';


export default function Home() {
  return (
    <>

      <WelcomePage />

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  )
}
