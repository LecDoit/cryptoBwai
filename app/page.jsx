import Navbar from "./components/Navbar";

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'



export default async function Home({prices}) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  if (data.session){
    redirect('/inflow')
  }

  if (!data.session){
    redirect('/getin')
  }

  return (
    <main>
      
      {/* <Navbar /> */}



    </main>
  )
}



