import BudgetNewReportCard from "@/components/budgetNewReportCard";
import NavbarLayout from "@/components/navbar-layout";
import Head from "next/head";

const NewBudgetReport = () => {
  return (
    <NavbarLayout currentPage="newBudgetReport">
      <Head>
        <title>Izveidot jaunu budžeta atskaiti</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-center">
        <div className="flex flex-col">
          <p className="flex justify-center text-lg pb-3">Lai izveidotu budžeta atskaiti, lūdzu, ievadiet vajadzīgo informāciju</p>
          <BudgetNewReportCard />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default NewBudgetReport;
