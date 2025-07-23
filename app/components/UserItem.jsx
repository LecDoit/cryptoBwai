import React from 'react'

export default function UserItem(data) {

  return (
    <div className='flex items-center justify-left gap-2 border rounded-[16px] p-2'>
        <div  className='avatar rounded-full h-12 w-12 bg-black text-white font-[700] flex items-center justify-center' >
            <p>{data.data.session.user.email.split("@")[0][0]}</p>
        </div>
        <div>
            <p>{data.data.session.user.email.split("@")[0]} </p>
            <p>{data.data.session.user.email} </p>
        </div>
    </div>
  )
}
