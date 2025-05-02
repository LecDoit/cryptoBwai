'use server'
import { cookies , headers} from "next/headers"


import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function addTrade(formData){

    
    // const trade = Object.fromEntries(formData)
    

    const supabase = createServerActionClient({ cookies: () => cookies() });


    const {data:{session}} = await supabase.auth.getSession()
    console.log({
      ...formData,
      user_email:session.user.email
  })

    const {error} = await supabase.from('trades')
    .insert({
        ...formData,
        user_email:session.user.email
    })

    if (error){
        console.log(error)
        throw new Error('Could not add the new trade')
        
    }
    const path = headers().get('referer')

    const url = new URL(path)
    const currentPath = url.pathname

    revalidatePath(currentPath)
    redirect(currentPath)
}


export async function deleteTrade(id){

    const supabase = createServerActionClient({cookies})

    const {error} = await supabase.from('trades')
    .delete()
    .eq('id',id)


    if (error){
        console.log(error)
        throw new Error('Could not delete the trade',error)
        
    }
    const path = headers().get('referer')

    const url = new URL(path)
    const currentPath = url.pathname

    revalidatePath(currentPath)
    redirect(currentPath)

}



export async function updateTrade(id, formData) {
    const supabase = createServerActionClient({cookies})

  
    const { data: { session } } = await supabase.auth.getSession();
    console.log(id,'-------------------')
  
    const { error } = await supabase
      .from("trades")
      .update({
        ...formData,
        user_email: session.user.email, // Optional: update user email
      })
      .eq("id", id);
  
    if (error) {
      console.error("Could not update the trade:", error);
      throw new Error("Could not update the trade");
    }
  
    const path = headers().get("referer");
    const url = new URL(path);
    const currentPath = url.pathname;
  
    revalidatePath(currentPath);
    redirect(currentPath);
  }