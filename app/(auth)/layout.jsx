import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Logo from '../components/K2.svg'

export default function AuthLayout({children}) {
  return (
    <>
        <nav>
        <Image
            src={Logo}
            alt='K'
            width={50}
            quality={100}
            />
            <Link href='/' >Home</Link>
            <Link href='/signup' >Register</Link>
            <Link href='/login'>Log in</Link>
        </nav>
        {children}
    </>

  )
}


