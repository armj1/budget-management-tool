import Head from "next/head";
import StatisticsPieChart from "@/components/pie-chart";
import NavbarLayout from "@/components/navbar-layout";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DashboardView = (data: any) => {
  return (
    <NavbarLayout>
      <Head>
        <title>Dashboard</title>
        <link
          rel="icon"
          href="/circle-dollar-sign.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <StatisticsPieChart />
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-center">
            <p>Jūs varat atspoguļot statistiku arī vecākām atskaitēm</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-1/2" variant="outline">
                  Pieejamās budžeta atskaites
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <Card className="flex flex-col mt-3 p-4">
            <div className="flex flex-row pb-2 justify-between">
              <Card className="p-2">
                <b>Bruto ienākumi:</b>
              </Card>
              <Card className="p-2">
                <b>Neto ienākumi:</b>
              </Card>
              <Card className="p-2">
                <b>Atlikums:</b>
              </Card>
            </div>
            <Separator className="mb-2" />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-between">
                <Card className="p-2 mb-2">Mājoklis:</Card>
                <Card className="p-2 mb-2">Pārtika:</Card>
                <Card className="p-2 mb-2">Transports:</Card>
                <Card className="p-2 mb-2">Veselība / skaistumkopšana:</Card>
                <Card className="p-2 mb-2">Bērni:</Card>
                <Card className="p-2 mb-2">Iepirkšanās / pakalpojumi:</Card>
                <Card className="p-2 mb-2">Brīvais laiks / izklaide:</Card>
              </div>
              <div className="flex flex-col justify-between">
                <Card className="p-2 mb-2">Izglītība:</Card>
                <Card className="p-2 mb-2">Atpūta:</Card>
                <Card className="p-2 mb-2">Apdrošināšana:</Card>
                <Card className="p-2 mb-2">Ieguldījumi / uzkrājumi:</Card>
                <Card className="p-2 mb-2">Mājdzīvnieki:</Card>
                <Card className="p-2 mb-2">Citi izdevumi:</Card>
                <Card className="p-2 mb-2">
                  <b>Kopējie izdevumi:</b>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default DashboardView;
