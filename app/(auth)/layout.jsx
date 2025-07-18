import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthLayout({children}) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if (data.session){
    redirect('/inflow')
  }
  return (
    <>
        {/* <nav>
        <Image
            src={Logo}
            alt='K'
            width={50}
            quality={100}
            />
            <Link href='/' >Home</Link>
            <Link href='/signup' >Register</Link>
            <Link href='/login'>Log in</Link>
        </nav> */}
        {children}
    </>

  )
}


