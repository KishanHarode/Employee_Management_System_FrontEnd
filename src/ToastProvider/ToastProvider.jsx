import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastProvider = ({position = "top-center"}) => {
  return (
    <ToastContainer position={position} className={'mt-5'} autoClose={3000}/>
  )
}

export default ToastProvider