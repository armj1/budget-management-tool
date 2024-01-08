import DropdownReportsList from "@/components/dropdown-reports-list";
import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Head from "next/head";
import router from "next/router";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

// Parametru datu tipa definēšana
interface DeleteBudgetReportProps{
  financialReports: FinancialRecord[]
}

const DeleteBudgetReport = (props: DeleteBudgetReportProps) => {
  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

  const handleReportSelect = (report: FinancialRecord) => {
    setSelectedReport(report);
  };

  // Ievaddatu nodošana API izsaukumam atskaites dzēšanai
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

  const hasReports = props.financialReports.length > 0;

  return (
    <NavbarLayout currentPage="deleteBudgetReport">
      <Head>
        <title>Izdzēst budžeta atskaiti</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      {hasReports ? (
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)] p-10 justify-center">
        <div className="flex flex-col justify-between w-1/3">
          <div className="flex flex-col justify-center">
            <p className="flex justify-center text-lg ">Pirms izdzēšanas, lūdzu, izvēlieties vajadzīgo atskaiti sarakstā</p>
            <p className="flex justify-center pb-2">
              Izvēlētās atskaites nosaukums: <b>{selectedReport?.title}</b>
            </p>
            <DropdownReportsList financialReports={props.financialReports} onSelectReport={handleReportSelect} selectedReport={selectedReport} />
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            Izdzēst atskaiti
          </Button>
        </div>
      </div>) : (
        <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-center">
        <div className="flex flex-col mr-5 w-1/5">
          <p className="flex justify-center text-lg mb-3">Jūs neesat izveidojis nevienu atskaiti</p>
          <Button className="flex justify-center bg-black" onClick={() => router.push("/dashboard/new-budget-report")}>
            Izveidot atskaiti
          </Button>
        </div>
      </div>
      )}
    </NavbarLayout>
  );
};

export default DeleteBudgetReport;

// Funkcija, kas ļauj iegūt atskaišu datus un tad ar tiem ielādēt atvērto skatu,
// kas ļauj izvairīties no tā, ka lietotājam bez atskaitēm uz mirkli būs redzams 
// ne "lietotājs bez atskaitēm" skats 
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();

  const session = await getServerSession(context.req, context.res, authOptions);
  const financialRecords = await prisma.financialRecord.findMany({
    where: { userId: session?.user.id },
  });

  console.log(financialRecords);
  const filteredFinancialRecords = financialRecords.map(({ date, ...rest }) => rest);

  return {
    props: { financialReports: filteredFinancialRecords },
  };
}
