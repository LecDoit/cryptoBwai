"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateForm() {
  const router = useRouter()

  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState('')
  const [buy, setBuy] = useState('')
  const [status, setStatus] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e)  => {
    e.preventDefault()
    setIsLoading(true)

    const newTrade = { currency, amount, buy}

    const res = await fetch('http://localhost:3000/api/trades', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTrade)
    })

    const json = await res

    if (json.error){
        console.log(error.message)
    }
    if (json.data){
        router.refresh()
        router.push('dashboard')
    }

  }
  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Currency:</span>
        <input
          required 
          type="text"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        />
      </label>
      <label>
        <span>Amount:</span>
        <textarea
          required
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </label>
      <label>
        <span>buy:</span>
        <textarea
          required
          onChange={(e) => setBuy(e.target.value)}
          value={buy}
        />
      </label>
      <button 
        className="btn-primary" 
        disabled={isLoading}
      >
      {isLoading && <span>Adding...</span>}
      {!isLoading && <span>Add Ticket</span>}
    </button>
    </form>
  )
}