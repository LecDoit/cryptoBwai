'use client'
import React, { useState } from 'react'
import AuthForm from '../AuthForm'
import BlackNameSvg from '../../../assets/BlackName.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


const Signup = () => {
  const router = useRouter()
  const [error,setError] = useState('')

  const handleSubmit = async ({email,password})=>{
    // e.preventDefault()
    
    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:`${location.origin}/api/auth/callback`
      }
    })
    if (error){
      setError(error.message)

    }
    if (!error){
      router.push('/verify')


    }
  }
  return (
    <main className='flex flex-col  min-h-screen'
    style={{
      backgroundImage: `
        linear-gradient(
          to bottom right,
          hsl(var(--background)),
          hsl(var(--accent)),
          hsl(var(--chart-7))
        )
      `
    }}
    >
      <BlackNameSvg id='test' colors={'hsl(var(--primary))'} size={440}/>
      <h2 className="text-xl font-semibold text-center mb-4">Sign up</h2>
      <AuthForm handleSubmit={handleSubmit}/>
      {error && (
        <div className="error">{error}</div>
      )}
    </main>

  )
}

export default Signup 