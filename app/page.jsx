import Navbar from "./components/Navbar";
import CryptoList from "./components/CryptoList";



export default function Home() {
  return (
    <main>
      <Navbar />
      <h2>Dashboard</h2>
      <CryptoList/>

    </main>
  )
}
