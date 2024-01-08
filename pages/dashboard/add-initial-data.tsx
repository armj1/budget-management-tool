import BudgetReportCard from "@/components/budgetNewReportCard";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Head from "next/head";

const AddInitialData = (data: any) => {
  return (
    <>
      <div className="bg-green-200 h-screen">
        <Head>
          <title>Pirmās atskaites izveidošana</title>
          <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
        </Head>
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-between w-full pr-5">
            <div className="invisible">cccccccccccccccc</div>
            <div className="flex flex-col items-center">
              <h1 className="mt-5 text-xl">
                Paldies par reģistrāciju, <b>{data.firstName}</b>!
              </h1>
              <p className="text-l mb-5">Pirms rīka izmantošanas, lūdzu, ievadiet zemāk prasīto informāciju</p>
            </div>
            <Button className="flex mt-7 ml-50" onClick={() => signOut({ callbackUrl: "/" })}>
              Atteikties
            </Button>
          </div>
          <BudgetReportCard />
        </div>
      </div>
    </>
  );
};
export default AddInitialData;
