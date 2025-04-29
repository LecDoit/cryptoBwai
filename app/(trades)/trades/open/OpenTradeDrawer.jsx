"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EditTradeButton({ trade }) {
    console.log(trade)

  const [amount, setAmount] = useState(trade.amount)
  const [price, setPrice] = useState(trade.price)
  const [status,setStatus] = useState(trade.status)

  const handleSave = async () => {
    console.log('baddadan')
    // const res = await fetch("/api/trades/update", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: trade.id,
    //     amount,
    //     price,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })

    // if (res.ok) {
    //   alert("Trade updated")
    // } else {
    //   alert("Update failed")
    // }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Trade</DrawerTitle>
          <DrawerDescription>ID: {trade.id}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2 space-y-4">
          <div>
            <label className="text-sm block mb-1">Amount</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Buy Price</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Status</label>
            <Input value={status} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
