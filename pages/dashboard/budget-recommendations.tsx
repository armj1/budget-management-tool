import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import FinancialRecord from "@/interfaces/FinancialRecord";
import Head from "next/head";
import { useEffect, useState } from "react";

const BudgetRecommendations = () => {
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);

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

  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

  const handleReportSelect = (report: FinancialRecord) => {
    setSelectedReport(report);
  };

  return (
    <NavbarLayout>
      <Head>
        <title>Budget recommendations</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-col bg-slate-300 h-[calc(100vh-88px)]	p-10">
        <div className="flex flex-row mb-5">
          <p className="flex flex-col justify-center font-medium ml-2 mr-3">Izvēlieties vienu no atskaitēm, lai saņemtu rekomendācijas</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Pieejamās budžeta atskaites</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              {financialReports &&
                financialReports.map((report) => (
                  <DropdownMenuItem key={report.id} onClick={() => handleReportSelect(report)}>
                    {report.title}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Card className="p-10">
          {!selectedReport && <p className="text-lg">Nav atskaites - nav padomu!</p>}
          {selectedReport && (
            <div>
              <p className="text-lg">Balstoties uz atskaites "{selectedReport?.title}" datiem mums ir radušies šādi ieteikumi:</p>
            </div>
          )}
        </Card>
      </div>
    </NavbarLayout>
  );
};

export default BudgetRecommendations;
