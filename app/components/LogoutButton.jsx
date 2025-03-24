'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from "@/components/ui/button"

export default function LogoutButton() {

    const router = useRouter()

    const handleLogout = async ()=>{
        const supabase = createClientComponentClient()
        const {error} = await supabase.auth.signOut()

        if (!error){
            router.push('/login')
        }
        if (error){
            console.log(error)
        }
    }
  return (
    <Button  onClick={handleLogout}>Logout</Button>
  )
}
