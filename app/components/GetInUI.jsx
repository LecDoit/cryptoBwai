'use client'
import React from 'react'
import {motion} from 'framer-motion'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Button } from "@/components/ui/button"
  import Link from 'next/link'

const GetInUI = () => {
  return (
    <motion.div
        initial={{opacity:0,y:-40}}
        animate={{opacity:1,y:-20}}
        transition={{
            delay:1.6,
            duration:0.5,
            // ease:'easeOut'

        }}
    >
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
    </motion.div>
  )
}

export default GetInUI