import CryptoList from "./stocks/CryptoList"

export default function Dashboard() {

  async function getTickets(){
    const res = await fetch('',{
      next:{
        revalidate:0
      }
    })
    return res.json()
  }
    return (
      <main>
        <h2>Dashboard</h2>

      </main>
    )
  }
