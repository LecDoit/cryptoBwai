import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Logo from './K2.svg'
import LogoutButton from './LogoutButton'

const Navbar = ({user}) => {
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
      <Link href='/dashboard' >dashboard</Link>
      <Link href='/dashboard/stocks' >Add Stocks</Link>
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton/>
    </nav>

  )
}

export default Navbar
