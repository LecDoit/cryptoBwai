"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditTrade from "../EditTradeForm";
import { useState } from "react";

export default function OpenTradeDrawer({price,trade}) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Close Trade</button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Close  Trade</DialogTitle>
          </DialogHeader>
          <EditTrade price={price} trade={trade}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
