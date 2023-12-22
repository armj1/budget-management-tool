import Head from "next/head";
import StatisticsPieChart from "@/components/pie-chart";
import NavbarLayout from "@/components/navbar-layout";

const DashboardView = (data: any) => {
  return (
    <NavbarLayout>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="bg-red-200 h-screen">
        <div className="flex flex-row bg-blue-200">
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
    </NavbarLayout>
  );
};

export default DashboardView;
