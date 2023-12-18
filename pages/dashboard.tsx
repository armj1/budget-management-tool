import Head from "next/head";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatisticsPieChart from "@/components/pie-chart";
import { signOut } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const prisma = new PrismaClient();

export default function Dashboard(data: any) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className="flex flex-row bg-indigo-200 p-2">
        <p className="pl-2">
          Labdien, <b>{data.firstName}</b>
        </p>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col p-6 justify-evenly basis-1/6 bg-lime-200">
          <Link href="dashboard/budget-recommendations">
            <Button className="bg-slate-950 text-white mb-5">
              Budžeta rekomendācijas
            </Button>
          </Link>
          <Link href="dashboard/loan-calculator">
            <Button className="bg-slate-950 text-white mb-5">
              Kredīta kalkulators
            </Button>
          </Link>
          <Link href="dashboard/tax-calculator">
            <Button className="bg-slate-950 text-white">
              Nodokļu kalkulators
            </Button>
          </Link>
        </div>
        <div className="bg-amber-200 basis-3/6 p-6">
          <p className="text-xl">
            <b>Statistika</b>
          </p>
          <div className="flex justify-center">
            <StatisticsPieChart />
          </div>
        </div>
        <div className="bg-red-200 basis-2/6 p-6">
          <p className="text-xl">
            <b>Brīdinājumi</b>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id},
  });
  return{
    props:{
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email
    }
  }
}
