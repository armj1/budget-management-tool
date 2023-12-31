import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { TrendingDown, TrendingUp } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

const CompareData = () => {
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);

  const [selectedReport1, setSelectedReport1] = useState<FinancialRecord>();
  const [selectedReport2, setSelectedReport2] = useState<FinancialRecord>();

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        const response = await fetch("/api/getFinancialRecord");
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

  const handleReportSelect1 = (report: FinancialRecord) => {
    setSelectedReport1(report);
  };

  const handleReportSelect2 = (report: FinancialRecord) => {
    setSelectedReport2(report);
  };

  const getIcon = (value: number) => {
    if (value > 0) {
      return <TrendingUp className="ml-3" />;
    } else if (value < 0) {
      return <TrendingDown className="ml-3" />;
    } else {
      return null;
    }
  };

  const canCompare = financialReports.length >= 2;
  const bothReportsSelected = selectedReport1 && selectedReport2;

  return (
    <NavbarLayout currentPage="compareData">
      <Head>
        <title>Salīdzināt atskaites</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="w-1/3">
          <p className="text-lg">
            {canCompare ? "Izvēlieties divas atskaites, lai veiktu salīdzināšanu" : "Jums ir nepieciešamas vismaz divas atskaites, lai veiktu salīdzināšanu"}
          </p>
          {canCompare && (
            <div>
              <p className="pt-3">
                Atskaite №1: <b>{selectedReport1?.title}</b>
              </p>
              <p className="pt-2 pb-3">
                Atskaite №2: <b>{selectedReport2?.title}</b>
              </p>
              <div className="flex flex-row">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-1/2" variant="outline">
                      Atskaite №1
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 ml-5">
                    {financialReports &&
                      financialReports
                        .filter((report) => report.id !== selectedReport2?.id)
                        .map((report) => (
                          <DropdownMenuItem key={report.id} onClick={() => handleReportSelect1(report)}>
                            {report.title}
                          </DropdownMenuItem>
                        ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-1/2 ml-2" variant="outline">
                      Atskaite №2
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    {financialReports &&
                      financialReports
                        .filter((report) => report.id !== selectedReport1?.id)
                        .map((report) => (
                          <DropdownMenuItem key={report.id} onClick={() => handleReportSelect2(report)}>
                            {report.title}
                          </DropdownMenuItem>
                        ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="pt-6 pb-3">
                Attēlotie dati uzrāda tendences izdevumos/ienākumos,
                <br /> salīdzinot atskaiti №2 ar atskaiti №1
              </p>
              <p className="flex flex-row">
                <TrendingUp className="mr-2" /> norāda uz pieaugumu noteiktā budžeta kategorijā
              </p>
              <p className="flex flex-row">
                <TrendingDown className="mr-2" /> norāda uz samazinājumu noteiktā budžeta kategorijā
              </p>
              <div className="flex flex-row pt-2">
                <Card className="flex flex-row p-2 mb-2 mr-3 w-80">
                  Pārtika: €-56.44 <TrendingDown className="ml-3" />
                </Card>
                apzīmē, ka izdevumi par pārtiku atskaitē №2 ir mazāki par €56.44 nekā atskaitē №1
              </div>
            </div>
          )}
        </div>
        {canCompare && bothReportsSelected && (
          <Card className="flex flex-col mt-3 p-4 w-1/2 h-5/6">
            <div className="flex flex-row pb-2 justify-between">
              <Card className="flex flex-row p-2">
                Bruto ienākumi: €{((selectedReport2?.totalIncome ?? 0) - (selectedReport1?.totalIncome ?? 0)).toFixed(2)}
                {getIcon((selectedReport2?.totalIncome ?? 0) - (selectedReport1?.totalIncome ?? 0))}
              </Card>
              <Card className="flex flex-row p-2">
                Neto ienākumi: €{((selectedReport2?.taxedIncome ?? 0) - (selectedReport1?.taxedIncome ?? 0)).toFixed(2)}
                {getIcon((selectedReport2?.taxedIncome ?? 0) - (selectedReport1?.taxedIncome ?? 0))}
              </Card>
            </div>
            <Separator className="mb-2" />
            <div className="flex flex-row justify-around">
              <div className="flex flex-col justify-around">
                <Card className="flex flex-row p-2 mb-2">
                  Mājoklis: €{((selectedReport2?.housingSpending ?? 0) - (selectedReport1?.housingSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.housingSpending ?? 0) - (selectedReport1?.housingSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Pārtika: €{((selectedReport2?.foodSpending ?? 0) - (selectedReport1?.foodSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.foodSpending ?? 0) - (selectedReport1?.foodSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Transports: €{((selectedReport2?.transportSpending ?? 0) - (selectedReport1?.transportSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.transportSpending ?? 0) - (selectedReport1?.transportSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Veselība / skaistumkopšana: €{((selectedReport2?.healthSpending ?? 0) - (selectedReport1?.healthSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.healthSpending ?? 0) - (selectedReport1?.healthSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Bērni: €{((selectedReport2?.childSpending ?? 0) - (selectedReport1?.childSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.childSpending ?? 0) - (selectedReport1?.childSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Iepirkšanās / pakalpojumi: €{((selectedReport2?.shoppingSpending ?? 0) - (selectedReport1?.shoppingSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.shoppingSpending ?? 0) - (selectedReport1?.shoppingSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Brīvais laiks / izklaide: €{((selectedReport2?.leisureSpending ?? 0) - (selectedReport1?.leisureSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.leisureSpending ?? 0) - (selectedReport1?.leisureSpending ?? 0))}
                </Card>
              </div>
              <div className="flex flex-col justify-around">
                <Card className="flex flex-row p-2 mb-2">
                  Izglītība: €{((selectedReport2?.educationSpending ?? 0) - (selectedReport1?.educationSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.educationSpending ?? 0) - (selectedReport1?.educationSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Atpūta: €{((selectedReport2?.recreationSpending ?? 0) - (selectedReport1?.recreationSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.recreationSpending ?? 0) - (selectedReport1?.recreationSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Apdrošināšana: €{((selectedReport2?.insuranceSpending ?? 0) - (selectedReport1?.insuranceSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.insuranceSpending ?? 0) - (selectedReport1?.insuranceSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Ieguldījumi / uzkrājumi: €{((selectedReport2?.investmentSpending ?? 0) - (selectedReport1?.investmentSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.investmentSpending ?? 0) - (selectedReport1?.investmentSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Mājdzīvnieki: €{((selectedReport2?.petSpending ?? 0) - (selectedReport1?.petSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.petSpending ?? 0) - (selectedReport1?.petSpending ?? 0))}
                </Card>
                <Card className="flex flex-row p-2 mb-2">
                  Citi izdevumi: €{((selectedReport2?.otherSpending ?? 0) - (selectedReport1?.otherSpending ?? 0)).toFixed(2)}
                  {getIcon((selectedReport2?.otherSpending ?? 0) - (selectedReport1?.otherSpending ?? 0))}
                </Card>
              </div>
            </div>
          </Card>
        )}
      </div>
    </NavbarLayout>
  );
};

export default CompareData;
