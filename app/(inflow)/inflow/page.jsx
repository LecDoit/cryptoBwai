import InflowForm from "./InflowForm"
import { InflowTable } from "./InflowTable"




export default async function Inflow() {
  


    return (
      <main>
        <div className={"flex"}>
          <InflowTable />
          <InflowForm/>
        </div>
      </main>
    )
  }
