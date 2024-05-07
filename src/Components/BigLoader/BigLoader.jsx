import React from 'react'
import Loader from '../Loader/Loader'
import style from './BigLoader.module.css'

export default function BigLoader({state}) {
  return (
    <div className={style.bigLoader} style={{display:state}} >
      <Loader/>
    </div>
  )
}
