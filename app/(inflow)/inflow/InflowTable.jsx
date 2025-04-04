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
import { cookies } from "next/headers"
import DeleteButton from "./DeleteButton"

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

  
  export async function InflowTable() {

    const inflows = await getInflow()
    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()
    // console.log(inflows[0].user_email)

    let stableCoins = 0
    let pln = 0
    let fxAvg = 0 
    const valuez = (inflows.map((value)=>{
      stableCoins = stableCoins +(value.stableCoins)
      pln = pln +(value.pln)
      fxAvg = fxAvg + (value.rate)
    }))
  
    return (
       
        <Card className={"w-[600px]  m-4"}>
            <CardHeader>
                <CardTitle>Inflow List</CardTitle>
                <CardDescription>Here you can see your inflow records</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableCaption>A list of your recent inflows.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>PLN</TableHead>
                    <TableHead>FX Rate</TableHead>
                    <TableHead className="text-right">Stable Coins</TableHead>
                    <TableHead className="text-center">Remove</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {inflows.map((inflow) => (
                    <TableRow key={inflow.id}>
                    <TableCell className="font-medium">{(inflow.id)}</TableCell>
                    <TableCell>{inflow.pln}</TableCell>
                    <TableCell>{inflow.rate}</TableCell>
                    <TableCell className="text-right">{inflow.stableCoins}</TableCell>
                    <TableCell className="text-center"><DeleteButton id={inflow.id}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell >Total</TableCell>
                    <TableCell>{pln}</TableCell>
                    <TableCell>{(fxAvg/inflows.length).toFixed(2)} Avg</TableCell>
                    <TableCell className="text-right">${stableCoins.toFixed(2)}</TableCell>                    
                </TableRow>
                </TableFooter>
            </Table>
                </CardContent>

        </Card>
    
    )
  }
  