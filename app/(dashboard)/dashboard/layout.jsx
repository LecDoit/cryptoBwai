
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import {cookies} from 'next/headers'
import Navbar from '@/app/components/Navbar'

export default async function DashboardLayout({children}) {

  console.log(cookies)
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()


  return (

    <>
    <Navbar user={data.session.user}/>    
    {children}
    </>
  )
}
