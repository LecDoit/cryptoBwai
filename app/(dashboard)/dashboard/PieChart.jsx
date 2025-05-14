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
import { pivotDashboard } from "@/app/helpers/helpers"




export function Component({piechartArray,chartConfig,trades,prices}) {
  const [chartData,setChartData] = useState('')
    useEffect(()=>{
      const data = pivotDashboard(trades,prices)
      data.map((item,i)=>{
        item['fill'] =`rgb(${16*i*3},${16*i*3},${16*i*3})`

      })
      console.log(data)
      setChartData(data)
    },[])


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Invested Crypto Currencies distribution</CardTitle>
        <CardDescription>Here you can find the distribution of your USD invested into multiple currencies</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartData}
          className="mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="totalAmount" label nameKey="currency" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total USDT invested
        </div>
      </CardFooter>
    </Card>
  )
}
