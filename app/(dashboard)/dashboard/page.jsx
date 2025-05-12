import { Cards} from "./Cards"
import { CardsPerformance } from "./CardsPerformance"
import {CardsAvailableAmount} from "./CardsAvailableAmount"
import {AverageCard} from './AverageCard'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies,headers } from "next/headers"
import {currPrice,calculateProfit} from "@/app/helpers/helpers"
import {FolderOpen,FolderClosed,BadgePercent,DollarSign} from 'lucide-react'
import {Component} from './PieChart'


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



  
  return data

}


async function getInflow() {
  const supabase = createServerComponentClient({cookies})

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  const sessionEmail = sessionData.session.user.email

  const userEmail = sessionData.session.user.email;

  const {data,error} = await supabase
    .from('inflow')
    .select()
    .eq('user_email',sessionEmail)
  if (error){
      console.log(error.message)
  }
  return data

}

export default async function Dashboard() {

  const trades = await getTrade()

  const prices = await getPrices()

  const inflow = await getInflow()

  const supabase = createServerComponentClient({cookies})

  // console.log(trades)

  let positiveClose = 0
  let negativeClose = 0
  let positiveOpen = 0
  let negativeOpen = 0
  let totalPerformanceOpen = 0 
  let totalPerformanceClose = 0 
  let investedAmount = 0 
  let inflowAmount = 0 
  const piechartArray = []
  const chartConfig = {}

  const pieChartFactory = (trade)=>{
    const curr = trade.currency
    const amount = trade.amount


    return {currency:curr,amount:Number(amount),fill:'red'}

  }

 
  
  const configFactory = (trade)=>{
    

    const k = trade.currency

    chartConfig[k] = {
      label: trade.currency,
      color:'red'
    }


  }
  

    inflow.map((item)=>{
      inflowAmount = Number(inflowAmount) + Number(item.stableCoins)
    })



    trades.map((item)=>{
   
      if (item.status=='Close'){
        if (item.leverage==''){
          totalPerformanceClose = totalPerformanceClose + 
          calculateProfit(item.type,item.amount,item.currency,item.price,item.closePrice,1).pnl
        } else {
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
        investedAmount = investedAmount+ Number(item.amount)
        piechartArray.push(pieChartFactory(item))
        configFactory(item)
        if (item.leverage==''){
          totalPerformanceOpen = totalPerformanceOpen +
           calculateProfit(item.type,item.amount,item.currency,item.price,currPrice(prices,item.currency).quote.USD.price,1).pnl
     
        } else {
          totalPerformanceOpen = totalPerformanceOpen +
          calculateProfit(item.type,item.amount,item.currency,item.price,currPrice(prices,item.currency).quote.USD.price,item.leverage).pnl


        }
        if (item.type=='Short'){


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




    return (
      <main className="p-4">
        <div className="flex gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Cards title={'Open Trades'} icon={FolderOpen} positiveCount={positiveOpen} negativeCount={negativeOpen} description={'Current active positions'}/>

          <Cards title={'Closed Trades'} icon={FolderClosed} positiveCount={positiveClose} negativeCount={negativeClose} description={'Closed positions'}/>

          <CardsPerformance title={'Open Performance'} icon={BadgePercent} revenue={totalPerformanceOpen.toFixed(2)} description={'Total Performance of open deals'}/>

          <CardsPerformance title={'Closed Performance'} icon={BadgePercent} revenue={totalPerformanceClose.toFixed(2)} description={'Total Performance of closed deals'}/>
          
          <CardsAvailableAmount title={'Available to trade'} icon={DollarSign} positiveCount={investedAmount.toFixed(0)} negativeCount={(inflowAmount+totalPerformanceClose).toFixed(0)} description={'Total inflow and revenue available to trade'}/>

        </div>

        <AverageCard prices={prices}/>
        <Component piechartArray={piechartArray} chartConfig= {chartConfig}/>
      </main>
    )
  }
