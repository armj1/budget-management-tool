import Head from "next/head";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Example from "@/components/pie-chart";
import StatisticsPieChart from "@/components/pie-chart";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className="flex flex-row bg-indigo-200 p-2">
        <img src="/profile-circle.svg" width="50px" />
        <p className="pl-2">
          Labdien, <b>lietotāj!</b>
        </p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col p-6 justify-evenly basis-1/6 bg-lime-200">
          <Link href="/budget-recommendations">
            <Button className="bg-slate-950 text-white mb-5">
              Budžeta rekomendācijas
            </Button>
          </Link>
          <Link href="/loan-calculator">
            <Button className="bg-slate-950 text-white mb-5">
              Kredīta kalkulators
            </Button>
          </Link>
          <Link href="/tax-calculator">
            <Button className="bg-slate-950 text-white">
              Nodokļu kalkulators
            </Button>
          </Link>
        </div>
        <div className="bg-amber-200 basis-3/6 p-6">
          <p>statistics</p>
          <StatisticsPieChart />
        </div>
        <div className="bg-red-200 basis-2/6 p-6">red flags</div>
      </div>
    </>
  );
}
