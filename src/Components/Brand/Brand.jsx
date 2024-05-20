import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ item }) {
  return (
    <>

      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 p-3" >
        <div className='layer'>
          <Link to={`/brands/${item._id}`}>
            <img src={item.image} alt={item?.name} className='w-100 border-main rounded-3 shadow-sm' />
          </Link>
        </div>
      </div >

    </>
  )
}
