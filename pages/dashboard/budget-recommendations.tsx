import DropdownReportsList from "@/components/dropdown-reports-list";
import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { PrismaClient } from "@prisma/client";
import { Dot } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";


interface BudgetRecommendationsProps{
  financialReports: FinancialRecord[]
}

const BudgetRecommendations = (props: BudgetRecommendationsProps) => {

  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();

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

  const [recommendationExists, setRecommendationExists] = useState(true);
  const recommendationCalculations = () => {
    let isRecommendation = true;
    let recommendedHousing = 0;
    let recommendedSavings = 0;
    let recommendedFood = 0;
    let recommendedInsurance = 0;
    let recommendedTransport = 0;
    let recommendedHealth = 0;
    let recommendedLeisure = 0;
    let openHousingRecomm = false;
    let openSavingsRecomm = false;
    let openLeftoverZero = false;
    let openLeftover = false;
    let openFood = false;
    let openInsurance = false;
    let openTransport = false;
    let openHealth = false;
    let openLeisure = false;
    const netIncome = selectedReport?.taxedIncome ?? 0;
    let anyConditionMet = false;

    if ((selectedReport?.housingSpending ?? 0) > netIncome * 0.3) {
      recommendedHousing = Math.round(netIncome * 0.3 * 100) / 100;
      openHousingRecomm = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.investmentSpending ?? 0) < netIncome * 0.15) {
      recommendedSavings = Math.round(netIncome * 0.15 * 100) / 100;
      openSavingsRecomm = true;
      anyConditionMet = true;
    }

    if (leftoverMoney == 0) {
      openLeftoverZero = true;
      anyConditionMet = true;
    } else if (leftoverMoney > 0) {
      openLeftover = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.foodSpending ?? 0) > netIncome * 0.15) {
      recommendedFood = Math.round(netIncome * 0.15 * 100) / 100;
      openFood = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.insuranceSpending ?? 0) > netIncome * 0.25) {
      recommendedInsurance = Math.round(netIncome * 0.25 * 100) / 100;
      openInsurance = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.transportSpending ?? 0) > netIncome * 0.15) {
      recommendedTransport = Math.round(netIncome * 0.15 * 100) / 100;
      openTransport = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.healthSpending ?? 0) > netIncome * 0.1) {
      recommendedHealth = Math.round(netIncome * 0.1 * 100) / 100;
      openHealth = true;
      anyConditionMet = true;
    }

    if ((selectedReport?.leisureSpending ?? 0) > netIncome * 0.1) {
      recommendedLeisure = Math.round(netIncome * 0.1 * 100) / 100;
      openLeisure = true;
      anyConditionMet = true;
    }

    if (!anyConditionMet) {
      isRecommendation = false;
    }

    return {
      isRecommendation: isRecommendation,
      housing: recommendedHousing,
      savings: recommendedSavings,
      food: recommendedFood,
      insurance: recommendedInsurance,
      transport: recommendedTransport,
      health: recommendedHealth,
      leisure: recommendedLeisure,
      openHousingRecomm: openHousingRecomm,
      openSavingsRecomm: openSavingsRecomm,
      openLeftoverZero: openLeftoverZero,
      openLeftover: openLeftover,
      openFood: openFood,
      openInsurance: openInsurance,
      openTransport: openTransport,
      openHealth: openHealth,
      openLeisure: openLeisure,
    };
  };

  const recommendations = recommendationCalculations();

  useEffect(() => {
    setRecommendationExists(recommendations.isRecommendation);
  }, [recommendations.isRecommendation]);

  const hasReports = props.financialReports.length > 0;

  return (
    <NavbarLayout currentPage="budgetRecommendations">
      <Head>
        <title>Budžeta rekomendācijas</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
        {hasReports ? (
      <div className="flex flex-col bg-slate-300 h-[calc(100vh-88px)]	p-10">
      <div className="flex flex-row mb-5">
          <p className="flex flex-col justify-center font-medium ml-2 mr-3">Izvēlieties vienu no atskaitēm, lai saņemtu rekomendācijas</p>
          <DropdownReportsList financialReports={props.financialReports} onSelectReport={handleReportSelect} selectedReport={selectedReport}/>
        </div>
        <Card className="p-10">
          {!selectedReport && <p className="text-xl">Nav atskaites - nav padomu!</p>}
          {selectedReport && recommendationExists && (
            <div className="flex flex-col">
              <p className="text-xl mb-2">Balstoties uz atskaites "{selectedReport?.title}" datiem mums ir radušies šādi ieteikumi:</p>
              {recommendations.openHousingRecomm && (
                <p className="flex flex-row text-lg">
                  <Dot />
                  Jūsu izdevumi mājoklim pārsniedz ieteicamos 30% no neto ienākuma - vēlamie maksimālie mājokļa izdevumi ir €{(recommendations.housing).toFixed(2)}, pašlaik
                  tie ir €{(selectedReport?.housingSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openSavingsRecomm && (
                <p className="flex flex-row text-lg">
                  <Dot />
                  Jūsu izdevumi uzkrājumiem nesasniedz ieteicamos 15% no neto ienākumiem - būtu vēlams tiem atvēlēt ap €{(recommendations.savings).toFixed(2)}, pašlaik tie
                  ir €{(selectedReport?.investmentSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openLeftover && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jums ir radies atlikums €{leftoverMoney.toFixed(2)} apmērā - Jūs varat to ieguldīt uzkrājumos un palielināt tos līdz €
                  {((selectedReport?.investmentSpending ?? 0) + leftoverMoney).toFixed(2)}
                </p>
              )}
              {recommendations.openLeftoverZero && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jums nav radies budžeta atlikums - iesakām pārskatīt izdevumus
                </p>
              )}
              {recommendations.openFood && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jūsu izdevumi pārtikai pārsniedz ieteicamos 15% no neto ienākuma - vēlamie maksimālie pārtikas izdevumi ir €{(recommendations.food).toFixed(2)},
                  pašlaik tie ir €{(selectedReport?.foodSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openInsurance && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jūsu izdevumi apdrošināšanai pārsniedz 25% no neto ienākuma - vēlamie maksimālie apdrošināšanas izdevumi ir €
                  {(recommendations.insurance).toFixed(2)}, pašlaik tie ir €{(selectedReport?.insuranceSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openTransport && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jūsu izdevumi transportam pārsniedz 15% no neto ienākuma - vēlamie maksimālie transporta izdevumi ir €{(recommendations.transport).toFixed(2)},
                  pašlaik tie ir €{(selectedReport?.transportSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openHealth && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jūsu izdevumi veselībai un skaistumkopšanai pārsniedz 10% no neto ienākuma - vēlamie maksimālie izdevumi ir €{(recommendations.health).toFixed(2)},
                  pašlaik tie ir €{(selectedReport?.healthSpending).toFixed(2)}
                </p>
              )}
              {recommendations.openLeisure && (
                <p className="flex flex-row text-lg">
                  <Dot /> Jūsu izdevumi izklaidei pārsniedz 10% no neto ienākuma - vēlamie maksimālie izklaides izdevumi ir €{(recommendations.leisure).toFixed(2)}, pašlaik
                  tie ir €{(selectedReport?.leisureSpending).toFixed(2)}
                </p>
              )}
            </div>
          )}
          {!recommendationExists && selectedReport && <p className="text-xl">Atskaitei "{selectedReport?.title}" nav radušies ieteikumi</p>}
        </Card>
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

export default BudgetRecommendations;

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
