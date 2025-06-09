import { headers } from "next/headers"
import { ClosedTradesTable } from "./ClosedTradesTable"
import TradeForm from "../TradeForm"



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


export default async function ClosedPage() {
  const prices = await getPrices()
  return (
    <div className="flex">
        <ClosedTradesTable/>
        <TradeForm prices={prices}/>
    </div>
  )
}
