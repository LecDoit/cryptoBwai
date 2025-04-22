import { Cards} from "./Cards"
import { CardsPerformance } from "./CardsPerformance"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies,headers } from "next/headers"
import {currPrice,calculateProfit} from "@/app/helpers/helpers"
import {FolderOpen,FolderClosed,BadgePercent} from 'lucide-react'


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

async function getTrade() {
  const supabase = createServerComponentClient({cookies})

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  const sessionEmail = sessionData.session.user.email

  const userEmail = sessionData.session.user.email;

  const {data,error} = await supabase
    .from('trades')
    .select()
    .eq('user_email',sessionEmail)
    // .in('status',['Open','Close'])
  if (error){
      console.log(error.message)
      return []
  }
  // console.log(data)
  // const open = data.filter(trade=>trade.status=='Open')
  // const close = data.filter(trade=>trade.status=='Close')


  
  return data

}

export default async function Dashboard() {

  const trades = await getTrade()

  const prices = await getPrices()

  const supabase = createServerComponentClient({cookies})


  let positiveClose = 0
  let negativeClose = 0
  let positiveOpen = 0
  let negativeOpen = 0
  let totalPerformanceOpen = 0 
  let totalPerformanceClose = 0 



  let revenueTotalClose = 0
  let percentageTotalClose = 0
  let revenueTotalOpen = 0
  let percentageTotalOpen = 0
  
  const valuez = (trades.map((trade)=>{
    // percentageTotalOpen = percentageTotal+calculateProfit(trade.type,trade.amount,trade.currency,trade.price,trade.closePrice,trade.leverage).roe



  }))


    trades.map((item)=>{


      if (item.status=='Close'){
        // console.log('new round',(totalPerformanceClose))
        if (item.leverage==''){
          totalPerformanceClose = totalPerformanceClose + 
          calculateProfit(item.type,item.amount,item.currency,item.price,item.closePrice,1).pnl
        } else {
          // totalPerformanceClose = totalPerformanceClose + (item.amount*item.leverage*item.closePrice)

          totalPerformanceClose = totalPerformanceClose +
          calculateProfit(item.type,item.amount,item.currency,item.price,item.closePrice,item.leverage).pnl
        }

        if (item.type=="Short"){
          if (item.price<item.closePrice)  {
            negativeClose= negativeClose+1
          } else{
            positiveClose=positiveClose+1
          }
        }
        if (item.type=="Long"){
          if (item.price<item.closePrice)  {
            positiveClose=positiveClose+1

          } else{
            negativeClose= negativeClose+1
          }
        }
      }
      if (item.status=='Open'){
        if (item.leverage==''){
          totalPerformanceOpen = totalPerformanceOpen +
           calculateProfit(item.type,item.amount,item.currency,item.price,currPrice(prices,item.currency).quote.USD.price,1).pnl
     
        } else {
          totalPerformanceOpen = totalPerformanceOpen +
          calculateProfit(item.type,item.amount,item.currency,item.price,currPrice(prices,item.currency).quote.USD.price,item.leverage).pnl


        }
        if (item.type=='Short'){

          if (item.leverage==''){
            // totalPerformanceOpen = totalPerformanceOpen + (item.amount*1*currPrice(prices,item.currency).quote.USD.price)
          } else {
            // totalPerformanceOpen = totalPerformanceOpen + (item.amount*item.leverage*currPrice(prices,item.currency).quote.USD.price)
          }

          if (item.price<currPrice(prices,item.currency).quote.USD.price){
            negativeOpen=negativeOpen+1
          } else{
            positiveOpen=positiveOpen+1
          }
        }
        if (item.type=="Long"){
          if (item.price<currPrice(prices,item.currency).quote.USD.price)  {
            positiveOpen=positiveOpen+1

          } else{
            negativeOpen= negativeOpen+1
          }
        }
      }


    })

    // currPrice(prices,trade.currency).quote.USD.price
  //   return {positiveClose,negativeClose}
  // }
  // console.log(profitableCalc(closeTrades))



    return (
      <main className="p-4">
        <div className="flex gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Cards title={'Open Trades'} icon={FolderOpen} positiveCount={positiveOpen} negativeCount={negativeOpen} description={'Current active positions'}/>

          <Cards title={'Closed Trades'} icon={FolderClosed} positiveCount={positiveClose} negativeCount={negativeClose} description={'Closed positions'}/>

          <CardsPerformance title={'Open Performance'} icon={BadgePercent} revenue={totalPerformanceOpen.toFixed(2)} description={'Total Performance of open deals'}/>

          <CardsPerformance title={'Closed Performance'} icon={BadgePercent} revenue={totalPerformanceClose.toFixed(2)} description={'Total Performance of closed deals'}/>
          
          {/* <Cards title={'Win Ratet'} icon='null' positiveCount={10} negativeCount={5} description={'Closed positions'}/> */}
        </div>
      </main>
    )
  }
