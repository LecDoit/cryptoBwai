import React from 'react'

export default function UserItem() {
  return (
    <div className='flex items-center justify-left gap-2 border rounded-[16px] p-2'>
        <div  className='avatar rounded-full h-12 w-12 bg-black text-white font-[700] flex items-center justify-center' >
            <p>PP</p>
        </div>
        <div>
            <p>Name</p>
            <p>email </p>
        </div>
    </div>
  )
}
