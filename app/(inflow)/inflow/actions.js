'use server'
import { cookies } from "next/headers"


import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addInflow(formData){

    const inflow = Object.fromEntries(formData)

    const supabase = createServerActionClient({cookies})

    const {data:{session}} = await supabase.auth.getSession()

    const {error} = await supabase.from('inflow')
    .insert({
        ...inflow,
        user_email:session.user.email
    })

    if (error){
        throw new Error('Could not add the new inflow')
    }

    revalidatePath('/inflow')
    redirect('/inflow')
}


export async function deleteInflow(id){


    const supabase = createServerActionClient({cookies})


    const {error} = await supabase.from('inflow')
    .delete()
    .eq('id',id)


    if (error){
        throw new Error('Could not delete the inflow')
    }

    revalidatePath('/inflow')
    redirect('/inflow')

}