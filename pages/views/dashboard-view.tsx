import Head from "next/head";
import StatisticsPieChart from "@/components/pie-chart";
import NavbarLayout from "@/components/navbar-layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DashboardView = (data: any) => {
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>(
    []
  );

  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        const response = await fetch("/api/getFinancialRecord");
        console.log("raw sql",response)
        if (response.ok) {
          const data = await response.json();
          setFinancialReports(data.financialRecords);
        }
      } catch (error) {
        console.error("Error fetching financial reports:", error);
      }
    };
    fetchFinancialReports();
  }, []);

  const handleReportSelect = (report: FinancialRecord) => {
    setSelectedReport(report);
  };

  const totalSpending =
  (selectedReport?.childSpending ?? 0) +
  (selectedReport?.educationSpending ?? 0) +
  (selectedReport?.foodSpending ?? 0) +
  (selectedReport?.healthSpending ?? 0) +
  (selectedReport?.housingSpending ?? 0) +
  (selectedReport?.insuranceSpending ?? 0) +
  (selectedReport?.investmentSpending ?? 0) +
  (selectedReport?.leisureSpending ?? 0) +
  (selectedReport?.otherSpending ?? 0) +
  (selectedReport?.petSpending ?? 0) +
  (selectedReport?.recreationSpending ?? 0) +
  (selectedReport?.shoppingSpending ?? 0) +
  (selectedReport?.transportSpending ?? 0);

  const leftoverMoney = Math.max((selectedReport?.taxedIncome ?? 0) - totalSpending, 0);

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
          <div className="flex flex-row justify-between">
            <p className="flex flex-col justify-center">
              Atvērta atskaite: <b>{selectedReport?.title}</b>
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-1/2" variant="outline">
                  Pieejamās budžeta atskaites
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                {financialReports &&
                  financialReports.map((report) => (
                    <DropdownMenuItem
                      key={report.id}
                      onClick={() => handleReportSelect(report)}
                    >
                      {report.title}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Card className="flex flex-col mt-3 p-4">
            <div className="flex flex-row pb-2 justify-between">
              <Card className="p-2">
                Bruto ienākumi: €{selectedReport?.totalIncome}
              </Card>
              <Card className="p-2">
                Neto ienākumi: €{selectedReport?.taxedIncome}
              </Card>
              <Card className="p-2">
                Atlikums: €{leftoverMoney}
              </Card>
            </div>
            <Separator className="mb-2" />
            <div className="flex flex-row justify-around">
              <div className="flex flex-col justify-between">
                <Card className="p-2 mb-2">
                  Mājoklis: €{selectedReport?.housingSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Pārtika: €{selectedReport?.foodSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Transports: €{selectedReport?.transportSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Veselība / skaistumkopšana: €{selectedReport?.healthSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Bērni: €{selectedReport?.childSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Iepirkšanās / pakalpojumi: €{selectedReport?.shoppingSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Brīvais laiks / izklaide: €{selectedReport?.leisureSpending}
                </Card>
              </div>
              <div className="flex flex-col justify-between">
                <Card className="p-2 mb-2">
                  Izglītība: €{selectedReport?.educationSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Atpūta: €{selectedReport?.recreationSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Apdrošināšana: €{selectedReport?.insuranceSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Ieguldījumi / uzkrājumi: €{selectedReport?.investmentSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Mājdzīvnieki: €{selectedReport?.petSpending}
                </Card>
                <Card className="p-2 mb-2">
                  Citi izdevumi: €{selectedReport?.otherSpending}
                </Card>
                <Card className="p-2 mb-2">Kopējie izdevumi: {totalSpending}  </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default DashboardView;
