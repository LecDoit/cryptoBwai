'use client'

import React from 'react'
import { useState } from 'react'


export default function AuthForm({handleSubmit}) {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

  return (
    <form onSubmit={(e)=>handleSubmit(e,email,password)}>
        <label>
            <span>Email:</span>
            <input 
                type='email'
                onChange={(e)=>setEmail(e.target.value)}
                value={email}>    
            </input>
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
                value={password}>    
            </input>
        </label>
        <button className="btn-primary">Submit</button>
    </form>
  )
}
