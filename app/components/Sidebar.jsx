// 'use client'

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
import UserItem from "./UserItem"
import { Settings } from "lucide-react"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

const Sidebar = async () => {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

// if (!data.session){
//   redirect('/login')
// }
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4">
        <div>
            <UserItem/>
        </div>
        <div>
         
            <Command>
              <CommandList>
                  <CommandGroup heading="Menu ">
                    <CommandItem  className='cursor-pointer'>Current Evaluation</CommandItem>
                    <CommandItem  className='cursor-pointer'>Inflow</CommandItem>
                    <CommandItem  className='cursor-pointer'>Trades</CommandItem>
                  </CommandGroup>
                <CommandSeparator />

              </CommandList>
            </Command>

        </div>
        <div className="grow">blank</div>
        <div className="flex gap-3">
          <Settings/>
          <div>Settings</div>
         
        </div>
    </div>
  )
}

export default Sidebar