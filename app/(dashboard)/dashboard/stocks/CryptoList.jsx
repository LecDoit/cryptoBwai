import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'

async function getTrades(){
    const supabase = createServerComponentClient({cookies})

    const {data,error} = await supabase.from('trades')
        .select()
        if (error){
            console.log(error.message)
        }
        return data
    }

export default async function CryptoList() {
    const trades = await getTrades()

    
  return (
    <>
    {trades.map((trade)=>(
        <div className='card my-5' key={trade.id}>
            <Link href={`dashboard/stocks/${trade.id}`}>
            <h3>{trade.currency}</h3>
            </Link>
        </div>
    ))}
    </>
  )
}





