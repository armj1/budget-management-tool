import NavbarLayout from "@/components/navbar-layout";
import Head from "next/head";

const BudgetRecommendations = () => {
  return (
    <NavbarLayout>
        <Head>
          <title>Budget recommendations</title>
          <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
        </Head>
        <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
          <p className="text-lg">Balstoties uz pēdējās atskaites datiem mums ir radušies šādi ieteikumi:</p>
        </div>
    </NavbarLayout>
  );
};

export default BudgetRecommendations;
