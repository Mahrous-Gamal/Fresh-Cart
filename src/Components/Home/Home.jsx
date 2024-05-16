import React from 'react'
import WelcomePage from '../WelcomePage/WelcomePage'
import Products from '../Products/Products';
import { Helmet } from "react-helmet";
import Categories from './../Categories/Categories';


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
