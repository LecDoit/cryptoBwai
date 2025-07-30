'use client'
import React, { useState } from 'react'
import AuthForm from '../AuthForm'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import BlackNameSvg from '../../../assets/BlackName.js'

const Login = () => {

  const [error,setError] = useState('')
  const router = useRouter()


  const handleSubmit = async ({email,password})=>{

    // e.preventDefault()
    setError('')
    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error){
      setError(error.message)
    }
    if (!error){
      router.push('/inflow')
    }

  }


  return (
    <main className='flex flex-col  '>
      <BlackNameSvg id='test' colors={'hsl(var(--primary))'} size={440}/>
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <AuthForm handleSubmit={handleSubmit}/>

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}

export default Login