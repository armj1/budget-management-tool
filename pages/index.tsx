import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="bg-gradient-to-b from-green-700 to-green-900 pt-6 pl-6 pr-6 basis-1/2 h-screen">
        <Head>
          <title>Front page</title>
          <link rel="icon" href="/tab_icon.ico" />
        </Head>

        <div className="text-6xl text-red-50 pb-3">
          BUDŽETA PĀRVALDES<p>RĪKS</p>
        </div>
        <Input className='mb-3' type="email" placeholder="Email" />
        <Input className='mb-3' type="password" placeholder="Password" />
        <Button className="bg-white text-black">Pieteikties</Button>
      </div>
      <div className="bg-slate-950 basis-1/2 h-screen"/>
    </div>
  );
}
