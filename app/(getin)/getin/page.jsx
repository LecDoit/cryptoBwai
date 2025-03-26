
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

 



export default async function GetIn() {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if (data.session){
    redirect('/inflow')
  }

  return (
    <main className="flex justify-center items-center min-h-screen">

    <Card className={"w-[380px]"} >
      <CardHeader>
        <CardTitle>Get In!</CardTitle>
        <CardDescription>Click here to Log in or Create New Account.</CardDescription>
      </CardHeader>

      <CardFooter className={'flex justify-center gap-4'}>
        <Link className='w-full'  href={'/login'}>
          <Button className='w-full' >
           Log In
          </Button>
        </Link>
        <Link  className='w-full'  href={'/signup'} >
          <Button className='w-full' >
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>

    </main>
  )
}



