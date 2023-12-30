import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import FinancialRecord from "@/interfaces/FinancialRecord";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";

const DeleteBudgetReport = () => {
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);

  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

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

  const handleReportSelect = (report: FinancialRecord) => {
    setSelectedReport(report);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteReport", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedReport),
      });
      if (response.ok) {
        router.reload();
      } else if (response.status === 500) {
        alert("Ievadītā parole nav pareiza!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <NavbarLayout>
      <Head>
        <title>Delete budget report</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)] p-10 justify-center">
        <div className="flex flex-col justify-between w-1/3">
          <div className="flex flex-col justify-center">
            <p className="flex justify-center text-lg ">Pirms izdzēšanas, lūdzu, izvēlieties vajadzīgo atskaiti sarakstā</p>
            <p className="flex justify-center pb-2">
              Izvēlētās atskaites nosaukums: <b>{selectedReport?.title}</b>
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="" variant="outline">
                  Pieejamās budžeta atskaites
                </Button>
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

          <Button variant="destructive" onClick={handleDelete}>
            Izdzēst atskaiti
          </Button>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default DeleteBudgetReport;
