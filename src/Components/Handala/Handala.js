import{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Handala({children}) {
  
  let navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home')
    }
  },[])
  return children
}
