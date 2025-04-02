import InflowForm from "./InflowForm"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export const dynamicParams = true

export async function generateMetadata({params}){
    const supabase = createServerComponentClient({cookies})


    const {data:inflow} = await supabase
    .from('inflow')
    .select()

    return{
        title:`Dojo helpdesk  | ${inflow?.id || "Trade not found"}`
    }
}


async function getInflow(id) {
    const supabase = createServerComponentClient({cookies})

    const {data,error} = await supabase.from('inflow')
    .select()
    if (error){
        console.log(error.message)
    }
    return data
    
}


export default async function Inflow({params}) {
  
  const inflows = await getInflow(params.id)
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

console.log(inflows)


    return (
      <main>
        <div className={""}>
          <InflowForm/>
          {inflows.map((inflow)=>(
            
                <div className='card my-5' key={inflow.id}>
                  {inflow.rate}
                </div>
            ))}
          {/* <div className="ml-auto">test
              {data.session.user.email===inflow.user_email && (
                  <DeleteButton id={inflow.id}/>
              )}
          </div> */}
        </div>
      </main>
    )
  }
