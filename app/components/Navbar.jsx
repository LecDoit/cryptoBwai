import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Logo from './K2.svg'

const Navbar = () => {
  return (
    <nav>
      <Image
      src={Logo}
      alt='K'
      width={50}
      quality={100}
       />
      <Link href='/' >Home</Link>
      <Link href='/signup' >signup</Link>
      <Link href='/login'>login</Link>
    </nav>

  )
}

export default Navbar
