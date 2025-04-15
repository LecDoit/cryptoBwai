import { Cards } from "./Cards"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies,headers } from "next/headers"


export const dynamicParams = true

async function getPrices() {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headers().get("host");


  const res = await fetch(`${protocol}://${host}/api/coinmarketcap`);
  const data = await res.json();

  if (res.ok) {
  //   console.log(data); // Do whatever you need
  } else {
    throw new Error(data.error || "Failed to load coins");
  }

  return data.data
}

async function getTrade(type) {
  const supabase = createServerComponentClient({cookies})

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  const sessionEmail = sessionData.session.user.email

  const userEmail = sessionData.session.user.email;

  const {data,error} = await supabase
    .from('trades')
    .select()
    .eq('user_email',sessionEmail)
    .eq('status',type)
  if (error){
      console.log(error.message)
  }


  
  return data

}

export default async function Dashboard() {

  const closeTrades = await getTrade('Close')

  const prices = await getPrices()
  console.log(prices)

  const supabase = createServerComponentClient({cookies})


  const profitableCalc = (list)=>{
    let positive = 0
    let negative = 0
    list.map((item)=>{
      if (item.type=="Short"){
        if (item.price<item.closePrice)  {
          negative= negative+1
        } else{
          positive=positive+1
        }
      }
      if (item.type=="Long"){
        if (item.price<item.closePrice)  {
          positive=positive+1

        } else{
          negative= negative+1
        }
      }



    })

    return {positive,negative}
  }
  // console.log(profitableCalc(closeTrades))



    return (
      <main className="p-4">
        <div className="flex gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* <Cards title={'Open Trades'} icon='null' positiveCount={10} negativeCount={5} description={'Current active positions'}/> */}

          <Cards title={'Closed Trades'} icon='null' positiveCount={profitableCalc(closeTrades).positive} negativeCount={profitableCalc(closeTrades).negative} description={'Closed positions'}/>

          {/* <Cards title={'Total Profit'} icon='null' positiveCount={10} negativeCount={5} description={'Closed positions'}/> */}
          
          {/* <Cards title={'Win Ratet'} icon='null' positiveCount={10} negativeCount={5} description={'Closed positions'}/> */}
        </div>
      </main>
    )
  }
