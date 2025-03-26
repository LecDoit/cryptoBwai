
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'





export default async function DashboardLayout({children}) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  // if (data.session){
  //   redirect('/inflow')
  // }

  return (


    <div className='' >
      
        {children}

   

    </div>

  )
}


