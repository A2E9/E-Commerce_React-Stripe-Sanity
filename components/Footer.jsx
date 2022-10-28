import React from 'react'
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 VStore Headphones All righs reserved</p>
       <p className='icons'>
        <AiOutlineTwitter />
        <AiFillInstagram />
       </p>
    </div>
  )
}

export default Footer