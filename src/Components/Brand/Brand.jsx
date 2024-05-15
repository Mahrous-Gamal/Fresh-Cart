import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ item }) {
  return (
    <>

      <div className="col-lg-3 col-md-4 col-sm-6 p-3" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', cursor: 'pointer' }}>
        <div className='layer'>
          <Link to={`/brands/${item._id}`}>
            <img src={item.image} alt={item?.name} className='w-100' />
          </Link>
        </div>
      </div>

    </>
  )
}
