
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'



export default async function GetIn() {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

//   if (data.session){
//     redirect('/inflow')
//   }

//   if (!data.session){
//     redirect('/login')
//   }

  return (
    <main>
getin page

    </main>
  )
}



