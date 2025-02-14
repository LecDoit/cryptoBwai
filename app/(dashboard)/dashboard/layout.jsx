import Navbar from '@/app/components/Navbar'
import React from 'react'

export default function DashboardLayout({children}) {
  return (

    <>
    <Navbar/>    
    {children}
    </>
  )
}
