'use client'
import React,{useState,useEffect} from 'react'
import LogoBlack from '../../assets/LogoBlack.js'


export default function LoadingSpinningLogo() {

  const [arrayColors,setArrayColors] = useState(["hsl(var(--accent))","hsl(var(--input))","hsl(var(--primary))"])


  useEffect(()=>{

    const interval = setInterval(()=>{
      setArrayColors(prev=>{
        const [first,...rest] = prev;
        return [...rest,first]
      })
      // console.log(arrayColors)
    },237)

    return ()=>clearInterval(interval)
  },[])


  return (
    <main className='flex flex-col items-center justify-center h-screen text-center text-center'>

        <LogoBlack size={85} colors={arrayColors} />
        {/* <LogoBlack color ={'red'} width={80}/> */}
        <h2 className='text-primary'>Loading...</h2>
    </main>
  )
}

{/* <main className="flex flex-col items-center justify-center h-screen text-center"> */}
