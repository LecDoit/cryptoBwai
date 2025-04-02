'use server'
import { cookies } from "next/headers"


import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { WEBPACK_LAYERS } from "next/dist/lib/constants"

export async function addInflow(formData){

    
    console.log('##########################',formData)
    // const inflow = Object.fromEntries(formData)
    

    const supabase = createServerActionClient({ cookies: () => cookies() });

    const {data:{session}} = await supabase.auth.getSession()

    const {error} = await supabase.from('inflow')
    .insert({
        ...formData,
        user_email:session.user.email
    })

    if (error){
        console.log(error)
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