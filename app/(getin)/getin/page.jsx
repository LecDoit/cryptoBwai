import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import BlackNameSvg from '../../../assets/BlackName.js'
import GetInUI from '@/app/components/GetInUI.jsx'



export default async function GetIn() {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if (data.session){
    redirect('/inflow')
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <BlackNameSvg id='test' colors={'black'} size={440}/>
      <GetInUI/>


    </main>
  )
}



