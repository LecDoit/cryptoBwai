import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { Button } from "@/components/ui/button"
import {currPrice} from "@/app/helpers/helpers"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies,headers } from "next/headers"

import { calculateProfit ,pivotDashboard} from "@/app/helpers/helpers"


export const dynamicParams = true
export async function generateMetadata({params}){
    const supabase = createServerComponentClient({cookies})

    const {data:inflow} = await supabase
    .from('trades')
    .select()

    return{
        title:`Dojo helpdesk  | ${inflow?.id || "Trade not found"}`
    }
}



async function wrong(id) {
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

async function getTrade() {
    const supabase = createServerComponentClient({cookies})

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    const sessionEmail = sessionData.session.user.email

    const userEmail = sessionData.session.user.email;

    const {data,error} = await supabase
      .from('trades')
      .select()
      .eq('user_email',sessionEmail)
      .eq('status','Open')
    if (error){
        console.log(error.message)
    }


    
    return data
  
}
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
  


  
export async function AverageCard({prices}) {

    const trades = await getTrade()

    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()


    // console.log(trades)
    console.log(pivotDashboard(trades))

    let stableCoins = 0
    let revenueTotal = 0
    let percentageTotal = 0

    const valuez = (trades.map((trade)=>{
      stableCoins = stableCoins +Number(trade.amount)

    revenueTotal = revenueTotal +
    calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency).quote.USD.price,trade.leverage).pnl

    percentageTotal = percentageTotal+calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency).quote.USD.price,trade.leverage).roe
    }))
  
    return (
       
        <Card className={"w-[800px]  m-4"}>
            <CardHeader>
                <CardTitle>Average values for Open Trades</CardTitle>
                <CardDescription>Here you can see your average price and return on Open Trades</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableCaption>A pivot table of your open trades.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Currency</TableHead>
                    <TableHead>Amount of USD</TableHead>
                    <TableHead>Average USD invested</TableHead>
                    <TableHead>Average buy price</TableHead>
                    <TableHead>Average Revenue</TableHead>
                    <TableHead>Total Return</TableHead>
                    {/* <TableHead className="text-right">Revenue USD</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-center">Remove</TableHead> */}
                </TableRow>
                </TableHeader>
                <TableBody>
                    
                {/* {trades.map((trade) => ( */}
                    {/* <TableRow key={trade.id}> */}
                    {/* <TableCell className="font-medium">{(trade.id)}</TableCell> */}
                    {/* <TableCell>{trade.currency}</TableCell> */}
                    {/* <TableCell>{trade.amount}</TableCell> */}
                    {/* <TableCell>{trade.type}</TableCell> */}
                    {/* <TableCell>{trade.price}</TableCell> */}
                    {/* <TableCell>{(currPrice(prices,trade.currency).quote.USD.price).toFixed(2)}</TableCell> */}
                    {/* <TableCell>{(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency)
                            .quote.USD.price,trade.leverage).pnl).toFixed(2)}</TableCell> */}
                    {/* <TableCell>{(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,currPrice(prices,trade.currency)
                            .quote.USD.price,trade.leverage).roe).toFixed(2)}%</TableCell> */}
                    {/* <TableCell className="text-right">{trade.stableCoins}</TableCell> */}
                    {/* </TableRow> */}

                {/* ))} */}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell >Total</TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell>Total calc</TableCell> */}
                    <TableCell className="text-right"></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>                    
                    <TableCell></TableCell>                    
                </TableRow>
                </TableFooter>
            </Table>
                </CardContent>

        </Card>
    
    )
  }
  