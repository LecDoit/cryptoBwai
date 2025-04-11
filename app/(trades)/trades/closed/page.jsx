import { headers } from "next/headers"
import { ClosedTradesTable } from "./ClosedTradesTable"
import TradeForm from "../TradeForm"


export default function ClosedPage() {
  return (
    <div className="flex">
        <ClosedTradesTable/>
        <TradeForm/>
    </div>
  )
}
