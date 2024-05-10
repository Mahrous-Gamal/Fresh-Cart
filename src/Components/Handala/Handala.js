import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Handala({children}) {
  let x=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      x('/home')
    }
  },[])
  return children
}
