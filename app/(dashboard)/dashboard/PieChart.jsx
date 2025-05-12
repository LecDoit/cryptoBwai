"use client"

import { PieChartIcon, TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useFormField } from "@/components/ui/form"



const chartDataTest = [

  {currency: 'SOL', amount: 100, fill: 'red'},
  {currency: 'BTC', amount: 100, fill: 'red'}
]

const chartConfigTest = {
  
  SOL: {
    label: "SOL",
    color: "blue"
  },
    BTC: {
        label: "BTC",
        color: "red"
    }
  

  

} 


export function Component({piechartArray,chartConfig}) {
  const [chartData,setChartData] = useState('')
  const [pieChartConfig, setPieChartConfig] = useState('')
    useEffect(()=>{

      console.log(chartConfig)
      console.log(piechartArray)
      setChartData(piechartArray)
      setPieChartConfig(chartConfig)
    },[])


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Invested Crypto Currencies distribution</CardTitle>
        <CardDescription>Here you can find the distribution of your USD invested into multiple currencies</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={pieChartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" label nameKey="currency" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Maybe something dynamic here like your most invested bla bla is ETH <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total USDT invested
        </div>
      </CardFooter>
    </Card>
  )
}
