import SubmitButton from "@/app/components/SubmitButton"
import { addStock } from "../actions"

export default function CreateForm() {

  
  return (
    <form action={addStock} className="w-1/2">
      <label>
        <span>Currency:</span>
        <input
          name="currency"
          required 
          type="text"

        />
      </label>
      <label>
        <span>Amount:</span>
        <textarea
          name="amount"
          required

        />
      </label>
      <label>
        <span>buy:</span>
        <textarea
          name="buy"
          required

        />
      </label>
      <SubmitButton/>
    </form>
  )
}