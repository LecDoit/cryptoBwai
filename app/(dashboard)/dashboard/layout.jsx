
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import {cookies} from 'next/headers'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import {redirect} from 'next/navigation'

export default async function DashboardLayout({children}) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if (!data.session){
    redirect('/login')
  }

  return (

    <div className='flex items-start justify-between' >
      <Sidebar/>
      <div className='w-full h-full'>
        <Header/>
        {children}
      </div>
    </div>
  )
}





