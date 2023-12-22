import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatisticsPieChart from "@/components/pie-chart";

const DashboardView = (data: any) => {
  return (
    <div className="bg-red-200 h-screen">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className="flex flex-row p-2 bg-green-200">
        <p className="pl-2">
          Labdien, <b>{data.firstName}</b>
        </p>
        <Button
          className="flex mt-7 ml-50"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Atteikties
        </Button>
      </div>
      <div className="flex flex-row bg-blue-200">
        <div className="flex flex-col p-6 justify-evenly basis-1/6 ">
          <Link href="dashboard/budget-recommendations">
            <Button className="">Budžeta rekomendācijas</Button>
          </Link>
          <Link href="dashboard/loan-calculator">
            <Button className="">Kredīta kalkulators</Button>
          </Link>
          <Link href="dashboard/tax-calculator">
            <Button className="">Nodokļu kalkulators</Button>
          </Link>
          <Link href="dashboard/compare-data">
            <Button className="">Salidzināt datus</Button>
          </Link>
        </div>
        <div className=" basis-3/6 p-6">
          <p className="text-xl">
            <b>Statistika</b>
          </p>
          <div className="flex justify-center">
            <StatisticsPieChart />
          </div>
        </div>
        <div className=" basis-2/6 p-6">
          <p className="text-xl">
            <b>Brīdinājumi</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
