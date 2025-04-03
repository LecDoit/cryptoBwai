import InflowForm from "./InflowForm"

import { notFound } from "next/navigation"
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
