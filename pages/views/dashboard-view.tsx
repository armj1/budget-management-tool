import Head from "next/head";
import NavbarLayout from "@/components/navbar-layout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { useEffect, useState } from "react";
import SpendingPieChart from "@/components/pie-chart";
import { Circle } from "lucide-react";
import DropdownReportsList from "@/components/dropdown-reports-list";

const DashboardView = (data: any) => {
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);

  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        const response = await fetch("/api/getFinancialRecord");
        if (response.ok) {
          const data = await response.json();
          setFinancialReports(data.financialRecords);
          const newestReport = data.financialRecords[0];
          setSelectedReport(newestReport);
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

  const leftoverMoney = Math.max(parseFloat(((selectedReport?.taxedIncome ?? 0) - totalSpending).toFixed(2)), 0);

  const spendingData = {
    Mājoklis: selectedReport?.housingSpending ?? 0,
    Pārtika: selectedReport?.foodSpending ?? 0,
    Transports: selectedReport?.transportSpending ?? 0,
    Veselība: selectedReport?.healthSpending ?? 0,
    Bērni: selectedReport?.childSpending ?? 0,
    Iepirkšanās: selectedReport?.shoppingSpending ?? 0,
    Izklaide: selectedReport?.leisureSpending ?? 0,
    Izglītība: selectedReport?.educationSpending ?? 0,
    Atpūta: selectedReport?.recreationSpending ?? 0,
    Apdrošināšana: selectedReport?.insuranceSpending ?? 0,
    Ieguldījumi: selectedReport?.investmentSpending ?? 0,
    Mājdzīvnieki: selectedReport?.petSpending ?? 0,
    Cits: selectedReport?.otherSpending ?? 0,
    Atlikums: leftoverMoney ?? 0,
  };

  return (
    <NavbarLayout currentPage="dashboard">
      <Head>
        <title>Sākumlapa</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="w-1/2">
          <SpendingPieChart spendingData={spendingData} />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between">
            <p className="flex flex-col justify-center">
              Atvērta atskaite: <b>{selectedReport?.title}</b>
            </p>
            <DropdownReportsList financialReports={financialReports} onSelectReport={handleReportSelect} selectedReport={selectedReport}/>
          </div>
          <Card className="flex flex-col mt-3 p-4">
            <div className="flex flex-row pb-2 justify-between">
              <Card className="p-2">Bruto ienākumi: €{(selectedReport?.totalIncome ?? 0).toFixed(2)}</Card>
              <Card className="p-2">Neto ienākumi: €{(selectedReport?.taxedIncome ?? 0).toFixed(2)}</Card>
              <Card className="flex flex-row p-2">
                <Circle className="bg-[#7986CB] rounded-full mr-2" />
                Atlikums: €{leftoverMoney.toFixed(2)}
              </Card>
            </div>
            <Separator className="mb-2" />
            <div className="flex flex-row justify-around">
              <div className="flex flex-col justify-between">
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#FF6384] rounded-full mr-2" />
                  Mājoklis: €{(selectedReport?.housingSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#36A2EB] rounded-full mr-2" />
                  Pārtika: €{(selectedReport?.foodSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#607D8B] rounded-full mr-2" />
                  Transports: €{(selectedReport?.transportSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#4BC0C0] rounded-full mr-2" />
                  Veselība / skaistumkopšana: €{(selectedReport?.healthSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#9966FF] rounded-full mr-2" />
                  Bērni: €{(selectedReport?.childSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#FF9F40] rounded-full mr-2" />
                  Iepirkšanās / pakalpojumi: €{(selectedReport?.shoppingSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#1E88E5] rounded-full mr-2" />
                  Brīvais laiks / izklaide: €{(selectedReport?.leisureSpending ?? 0).toFixed(2)}
                </Card>
              </div>
              <div className="flex flex-col justify-between">
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#FF7043] rounded-full mr-2" />
                  Izglītība: €{(selectedReport?.educationSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#922B21] rounded-full mr-2" />
                  Atpūta: €{(selectedReport?.recreationSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#5C6BC0] rounded-full mr-2" />
                  Apdrošināšana: €{(selectedReport?.insuranceSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#154360] rounded-full mr-2" />
                  Ieguldījumi / uzkrājumi: €{(selectedReport?.investmentSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#81C784] rounded-full mr-2" />
                  Mājdzīvnieki: €{(selectedReport?.petSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  <Circle className="bg-[#B7950B] rounded-full mr-2" />
                  Citi izdevumi: €{(selectedReport?.otherSpending ?? 0).toFixed(2)}
                </Card>
                <Card className="p-2 mb-2">Kopējie izdevumi: €{totalSpending.toFixed(2)}</Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default DashboardView;
