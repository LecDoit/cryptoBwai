import  { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



export function CardsPerformance({ title, icon: Icon, revenue, negativeCount, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
            { revenue>0 ? (
                <span className="text-emerald-500">{revenue}</span>
            ):(
                <span className="text-red-500">{revenue}</span>
            )
                      
            }
    

        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}