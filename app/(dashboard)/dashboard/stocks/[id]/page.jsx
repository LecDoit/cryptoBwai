import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export const dynamicParams = true

export async function generateMetadata({params}){
    const supabase = createServerComponentClient({cookies})


    const {data:trade} = await supabase.from('trades')
    .select()
    .eq('id',params.id)
    .single()
    console.log(data)

    return{
        title:`Dojo helpdesk  | ${trade?.title || "Trade not found"}`
    }
}


async function getTrade(id) {
    const supabase = createServerComponentClient({cookies})

    const {data} = await supabase.from('trades')
    .select()
    .eq('id',id)
    .single()
    
    if (!data.ok){
        notFound()
    }

    return data
    
}

export default async function TradeDetails({params}){
    const trade = await getTrade(params.id)

    return (
        <main>
            <nav>
                <h2>Trade detailes</h2>
            </nav>

            <div className="card">
                <h3>{trade.currency}</h3>
            
            </div>
        </main>
    )
}