// 'use client'

import Link from 'next/link'
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
                    <CommandItem  className='cursor-pointer'>
                      <Link href='/dashboard/'>Dashboard</Link>
                    </CommandItem>
                    <CommandItem  className='cursor-pointer'>
                      <Link href='/inflow/'>Inflow</Link>
                    </CommandItem>



                    {/* <CommandItem  className='cursor-pointer'>
                      <Link href='/trades/'>Trades</Link>
                    </CommandItem> */}

                    <CommandItem className="cursor-default opacity-70 hover:bg-transparent">
                    <span className="font-medium">Trades</span>
                    </CommandItem>

                    {/* Subitems */}
                    <div className="pl-4">
                      <CommandItem className="cursor-pointer">
                        <Link href="/trades/open">Open Trades</Link>
                      </CommandItem>
                      <CommandItem className="cursor-pointer">
                        <Link href="/trades/closed">Closed Trades</Link>
                      </CommandItem>
                    </div>



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