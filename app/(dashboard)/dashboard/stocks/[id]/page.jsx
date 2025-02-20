import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import DeleteButton from "./DeleteButton"

export const dynamicParams = true

export async function generateMetadata({params}){
    const supabase = createServerComponentClient({cookies})


    const {data:trade} = await supabase
    .from('trades')
    .select()
    .eq('id',params.id)
    .single()


    return{
        title:`Dojo helpdesk  | ${trade?.id || "Trade not found"}`
    }
}


async function getTrade(id) {
    const supabase = createServerComponentClient({cookies})

    const {data} = await supabase.from('trades')
    .select()
    .eq('id',id)
    .single()
    
    if (!data){
        notFound()
        
    }
    return data
    
}

export default async function TradeDetails({params}){

    const trade = await getTrade(params.id)
    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()


    return (
        <main>
            <nav>
                <h2>Trade detailes</h2>
                <div className="ml-auto">
                    {data.session.user.email===trade.user_email && (
                        <DeleteButton id={trade.id}/>
                    )}
                </div>
            </nav>

            <div className="card">
                <h3>{trade.currency}</h3>
            
            </div>
        </main>
    )
}