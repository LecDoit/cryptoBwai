import { Suspense } from 'react'
import CreateForm from './create/CreateForm'
import Link from 'next/link'
import CryptoList from './CryptoList'
import Loading from '../loading'

export default async function Trades() {
  return (
    <main>
      <nav>
        <h2 className="text-center">Current trades</h2>    
        <Link href='stocks/create' className='ml-auto'>
          <button className='btn-primary'>New Trade</button>
        </Link>  
      </nav>
      <Suspense fallback={<Loading/>}>
        <CryptoList/>
      </Suspense>
    </main>
  )
}