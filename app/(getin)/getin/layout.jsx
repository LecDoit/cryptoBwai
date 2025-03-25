
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

 
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]



export default async function DashboardLayout({children}) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  // if (data.session){
  //   redirect('/inflow')
  // }

  return (


    <div className='' >
      
        {children}

    <Card className={cn("w-[380px]")} >
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Click here to Log In.</CardDescription>
      </CardHeader>


      <CardFooter>
        <Button className="w-full">
          <Check /> Log In
        </Button>
        <Button className="w-full">
          <Check /> Sign Up
        </Button>
      </CardFooter>
    </Card>

    </div>

  )
}


