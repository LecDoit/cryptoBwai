'use client'

import {TiDelete} from 'react-icons/ti'
import { useTransition } from "react"
import { deleteInflow } from "./actions"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'


export default function DeleteButton({id}) {

    const [isPending,startTransition] = useTransition()


  return (
    <Button 
        onClick={()=>startTransition(()=>deleteInflow(id))}
        disabled={isPending}
    >
        {isPending && (
            <>
            <   Loader2 className='animate-spin'/>
                ing...
            </>
        )}
        {!isPending &&(
            <>
                <TiDelete/>
                Delete   
            </>
        )}
    </Button>
  )
}
