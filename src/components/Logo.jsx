import React from 'react'
import heroImage from '../assets/logo3.png'

const Logo = ({width="78px"}) => {
  return (
    <div >
      <img src={heroImage} width={width} alt="" />
    </div>
  )
}

export default Logo