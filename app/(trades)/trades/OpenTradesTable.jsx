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
import DeleteButton from "./DeleteButton"


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
  


  
export async function OpenTradesTable({prices}) {
    // console.log(prices)

    const trades = await getTrade()

    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()

    const currPrice = (arr,arg)=>{
        return arr.find(el=>el.symbol==arg)
    }

    // console.log(currPrice(prices,'BTC'))
    


    let stableCoins = 0
    let revenueUSD = 0 
    let revenuePLN = 0 
    const valuez = (trades.map((value)=>{
      stableCoins = stableCoins +Number(value.amount)
    //   const currentPrice = 
    //   revenueUSD = revenueUSD +(value.revenueUSD)
    //   revenuePLN = revenuePLN +(value.revenuePLN)
    }))
  
    return (
       
        <Card className={"w-[800px]  m-4"}>
            <CardHeader>
                <CardTitle>Open Trades List</CardTitle>
                <CardDescription>Here you can see your Open Trades</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableCaption>A list of your recent trades.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Stable Coin (USD)</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Buy Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead className="text-right">Revenue USD</TableHead>
                    <TableHead className="text-right">Revenue PLN</TableHead>
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
                    <TableCell>{(currPrice(prices,trade.currency).quote.USD.price).toFixed(2)}</TableCell>
                    <TableCell>{'calc needed'}</TableCell>
                    <TableCell>{'calc needed'}</TableCell>
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
                    <TableCell>sum</TableCell>                    
                    <TableCell>sum</TableCell>                    
                </TableRow>
                </TableFooter>
            </Table>
                </CardContent>

        </Card>
    
    )
  }
  