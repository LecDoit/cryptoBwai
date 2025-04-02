'use server'
import { cookies } from "next/headers"


import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addStock(formData){
    const stock = Object.fromEntries(formData)
    console.log('1',formData)
    console.log('2',stock)

    const supabase = createServerActionClient({cookies})

    const {data:{session}} = await supabase.auth.getSession()

    const {error} = await supabase.from('trades')
    .insert({
        ...stock,
        user_email:session.user.email
    })

    if (error){
        throw new Error('Could not add the new trade')
    }

    revalidatePath('/stocks')
    redirect('/dashboard')
}


export async function deleteTicket(id){


    const supabase = createServerActionClient({cookies})


    const {error} = await supabase.from('trades')
    .delete()
    .eq('id',id)


    if (error){
        throw new Error('Could not delete the trade')
    }

    revalidatePath('/stocks')
    redirect('/dashboard')


}