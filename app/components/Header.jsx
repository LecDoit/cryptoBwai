'use client'

import { BellIcon } from "lucide-react"
import { CommandDemo } from "./Command"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import LogoutButton from "./LogoutButton"
  




const Header = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 p-4 border-b">
        <CommandDemo/>
        <div className="flex items-center justify-end">

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div variant='outline' size='icon'>
                <BellIcon className="h-4 w-4"/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogoutButton/></DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>


    </div>
  )
}

export default Header