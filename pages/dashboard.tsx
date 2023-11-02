import Head from "next/head";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className="flex flex-col pl-6 justify-evenly h-screen">
        <Link href="/budget-recommendations">
          <Button className="bg-slate-950 text-white mb-5">
            Budžeta rekomendācijas
          </Button>
        </Link>
        <Link href="/loan-calculator">
          <Button className="bg-slate-950 text-white mb-5">Kredīta kalkulators</Button>
        </Link>
        <Link href="/tax-calculator">
          <Button className="bg-slate-950 text-white">Nodokļu kalkulators</Button>
        </Link>
      </div>
    </div>
  );
}
