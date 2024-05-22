import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color=" #2cb82c"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />

        </div>
    )
}
