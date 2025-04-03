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
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamicParams = true

// export async function generateMetadata({params}){
//     const supabase = createServerComponentClient({cookies})



//     const {data:inflow} = await supabase
//     .from('inflow')
//     .select()

//     return{
//         title:`Dojo helpdesk  | ${inflow?.id || "Trade not found"}`
//     }
// }


async function getInflow() {
    const supabase = createServerComponentClient({cookies})

    const {data,error} = await supabase.from('inflow')
    .select()
    if (error){
        console.log(error.message)
    }
    return data
    
}

  
  export async function InflowTable() {

    const inflows = await getInflow()
    
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
                </TableRow>
                </TableHeader>
                <TableBody>
                {inflows.map((inflow) => (
                    <TableRow key={inflow.id}>
                    <TableCell className="font-medium">{(inflow.id)}</TableCell>
                    <TableCell>{inflow.pln}</TableCell>
                    <TableCell>{inflow.rate}</TableCell>
                    <TableCell className="text-right">{inflow.stableCoins}</TableCell>
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
  