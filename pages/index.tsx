import Head from 'next/head'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-700 to-green-900	h-screen">
      <Head>
        <title>Front page</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className='text-6xl text-red-50'>BUDŽETA PĀRVALDES<p>RĪKS</p></div>
      <Button>Click me</Button>

    </div>
  )
}
