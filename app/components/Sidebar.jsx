'use client'

import UserItem from "./UserItem"

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4">
        <div>
            <UserItem/>
        </div>
        <div>Current Evaluation</div>
        <div >Inflow</div>
        <div className="grow">Trades</div>
        <div>Settings</div>
    </div>
  )
}

export default Sidebar