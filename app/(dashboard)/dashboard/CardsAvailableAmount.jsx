import  { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



export function CardsAvailableAmount({ title, icon: Icon, positiveCount, negativeCount, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <span className="">{positiveCount}</span>
          <span className="mx-1">/</span>
          <span className="">{negativeCount}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}