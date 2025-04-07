import TradeForm from "./TradeForm"
import { OpenTradesTable } from "./OpenTradesTable"



export default async function Trades() {
  


    return (
      <main>
        <div className={"flex"}>
            <OpenTradesTable/>
            <TradeForm/>
        </div>
      </main>
    )
  }
