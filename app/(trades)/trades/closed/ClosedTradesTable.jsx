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
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies,headers } from "next/headers"
import DeleteButton from "../DeleteButton"
import { calculateProfit } from "@/app/helpers/helpers"


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
      .eq('status','Close')
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
  


  
export async function ClosedTradesTable({prices}) {
    // console.log(prices)

    const trades = await getTrade()

    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()

    // const currPrice = (arr,arg)=>{
    //     return arr.find(el=>el.symbol==arg)
    // }
    
    // const calculateProfit = (type,amount,currency,buyPrice,sellPrice,leverage)=>{
    //     const positionSize = amount*(leverage ? leverage : 1)
    //     const quantity = positionSize / buyPrice

    //     const pnlShort = (buyPrice-sellPrice) * quantity
    //     const pnlLong = (sellPrice-buyPrice) * quantity
    //     const roeShort = (pnlShort/amount )*100
    //     const roeLong = (pnlLong/amount )*100

    //     if (type=='Short'){
    //         return {"pnl":pnlShort,'roe':roeShort}
    //     }
    //     if (type=='Long'){
    //         return {"pnl":pnlLong,'roe':roeLong}
    //     }
    // }



    let stableCoins = 0
    let revenueTotal = 0
    let percentageTotal = 0

    const valuez = (trades.map((trade)=>{
      stableCoins = stableCoins +Number(trade.amount)
      percentageTotal = percentageTotal+calculateProfit(trade.type,trade.amount,trade.currency,trade.price,trade.closePrice,trade.leverage).roe

      revenueTotal = revenueTotal +
                calculateProfit(trade.type,trade.amount,trade.currency,trade.price,trade.closePrice,trade.leverage).pnl

    }))

  
    return (
       
        <Card className={"w-[800px]  m-4"}>
            <CardHeader>
                <CardTitle>Closed Trades List</CardTitle>
                <CardDescription>Here you can see your Closed Trades</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableCaption>A list of your past trades.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Stable Coin (USD)</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Buy Price</TableHead>
                    <TableHead>Sell Price</TableHead>
                    <TableHead className="text-right">Revenue USD</TableHead>
                    <TableHead className="text-right">%</TableHead>
                    <TableHead className="text-center">Remove</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {trades.map((trade) => (
                    <TableRow key={trade.id}>
                    <TableCell className="font-medium">{(trade.id)}</TableCell>
                    <TableCell>{trade.currency}</TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell>{trade.type}</TableCell>
                    <TableCell>{trade.price}</TableCell>
                    <TableCell>{(trade.closePrice)}</TableCell>
                
                    <TableCell>{(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,trade.closePrice,trade.leverage).pnl)}</TableCell>

                    <TableCell>{(calculateProfit(trade.type,trade.amount,trade.currency,trade.price,trade.closePrice,trade.leverage).roe)}%</TableCell>

                    {/* <TableCell>{((trade.closePrice/trade.price-1)*trade.amount).toFixed(2)}</TableCell> */}
                    {/* <TableCell>{((trade.closePrice/trade.price-1)*100).toFixed(2)}%</TableCell> */}

                    {/* <TableCell className="text-right">{trade.stableCoins}</TableCell> */}
                    <TableCell className="text-center"><DeleteButton id={trade.id}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell >Total</TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell>Total calc</TableCell> */}
                    <TableCell className="text-right">${stableCoins.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{revenueTotal.toFixed(2)}</TableCell>                    
                    <TableCell>{(percentageTotal/trades.length).toFixed(2)}%</TableCell>                    
                </TableRow>
                </TableFooter>
            </Table>
                </CardContent>

        </Card>
    
    )
  }
  