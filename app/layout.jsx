import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from "./components/Sidebar";
import React from 'react'


import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import CryptoList from "./components/CryptoList";

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ledgerly',
  description: 'Ledgerly is a modern, easy-to-use financial tracking and bookkeeping app that helps individuals and businesses stay on top of their income, trades, and financial goals.',
}




export default async function RootLayout({ children }) 

{
   
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start justify-between`} >
        {/* <CryptoList/> */}
        <main className='w-full h-full'

        >
          {/* <Header/> */}
          {React.cloneElement(children,{children})}
        </main>
      </body>
    </html>
  )
}
