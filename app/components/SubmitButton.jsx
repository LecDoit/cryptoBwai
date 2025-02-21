'use client'
import { experimental_userFormStatus, useFormStatus } from "react-dom"

export default function SubmitButton() {
    const { pending } = useFormStatus()
    
  return (
    <button 
        className="btn-primary"
        disabled={pending}
    >
        {pending && <span>Submitting...</span>}
        {!pending && <span>Submit</span>}
        
    </button>
  )
}
