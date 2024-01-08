import DropdownReportsList from "@/components/dropdown-reports-list";
import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

interface TaxCalculatorProps {
  financialReports: FinancialRecord[];
}

const TaxCalculator = (props: TaxCalculatorProps) => {
  const [apgadajamoSkaits, setApgadajamoSkaits] = useState(0);
  const [isAlgasGramatinaChecked, setIsAlgasGramatinaChecked] = useState(false);
  const [isNeapliekamaisMinimumsChecked, setIsNeapliekamaisMinimumsChecked] = useState();
  const [preciseNeapliekamaisMinimums, setPreciseNeapliekamaisMinimums] = useState(0);
  const [additionalTaxCuts, setAdditionalTaxCuts] = useState(0);
  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();
  const [isNetIncomeSame, setIsNetIncomeSame] = useState(true);

  const handleReportSelect = (report: FinancialRecord) => {
    setSelectedReport(report);
  };

  const handleCheckbox1Change = (e: any) => {
    setIsAlgasGramatinaChecked(e.target.checked);
  };

  const handleCheckbox2Change = (e: any) => {
    setIsNeapliekamaisMinimumsChecked(e.target.checked);
  };

  const handleApgadajamoSkaitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApgadajamoSkaits(parseInt(e.target.value));
  };

  const handleUserInput1Change = (e: any) => {
    setAdditionalTaxCuts(parseFloat(e.target.value));
  };

  const handleUserInput2Change = (e: any) => {
    setPreciseNeapliekamaisMinimums(parseFloat(e.target.value));
  };

  const numberOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const makeCalculations = () => {
    const preciseNeapliekamaisMinimumsValue = preciseNeapliekamaisMinimums || 0;
    const additionalTaxCutsValue = additionalTaxCuts || 0;
    let untaxedMinimum = 0;
    let taxCuts = 0;
    let incomeTax = 0;
    const income = selectedReport?.totalIncome ?? 0;
    const vsaoi = Math.round(income * 0.105 * 100) / 100;

    // Neapliekamā minimuma vērtības noteikšana
    if (isNeapliekamaisMinimumsChecked) {
      untaxedMinimum = Math.round(preciseNeapliekamaisMinimumsValue * 100) / 100;
    } else if (isAlgasGramatinaChecked === false || income > 1799) {
      untaxedMinimum = 0;
    } else {
      untaxedMinimum = (6000 - 0.38462 * (income * 12 * 1.06 - 6000)) / 12;
      untaxedMinimum = Math.min(untaxedMinimum, 500);
      untaxedMinimum = Math.round(untaxedMinimum * 100) / 100;
    }

    // Atvieglojuma par apgādībā esošām personām noteikšana
    if (isAlgasGramatinaChecked === false) {
      taxCuts = 0;
    } else {
      taxCuts = 250 * apgadajamoSkaits;
    }

    // Iedzīvotāju ienākuma nodokļa aprēķins
    if (income * 12 <= 20004) {
      incomeTax = Math.max((income - vsaoi - untaxedMinimum - taxCuts - additionalTaxCutsValue) * 0.2, 0);
      incomeTax = Math.round(incomeTax * 100) / 100;
    } else  {
      const income20perc = Math.max((1667 - vsaoi - untaxedMinimum - taxCuts - additionalTaxCutsValue) * 0.2, 0);
      const income23perc = Math.max((income - 1667) * 0.23, 0);
      incomeTax = Math.round((income20perc + income23perc) * 100) / 100;
    }

    // Neto ienākumu aprēķins
    const netIncome = Math.round((income - vsaoi - incomeTax) * 100) / 100;

    return {
      untaxedMinimum: untaxedMinimum,
      taxCuts: taxCuts,
      vsaoi: vsaoi,
      netIncome: netIncome,
      incomeTax: incomeTax,
    };
  };
  const result = makeCalculations();

  const areNetIncomesDifferent = selectedReport?.taxedIncome !== result.netIncome;

  useEffect(() => {
    if (selectedReport && areNetIncomesDifferent) {
      setIsNetIncomeSame(false);
    } else {
      setIsNetIncomeSame(true);
    }
  }, [selectedReport, areNetIncomesDifferent]);

  // API izsaukums funkcijai priekš neto ienākumu atjaunināšanas atskaitē
  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/updateNetIncome", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedReport?.id,
          taxedIncome: result.netIncome,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.reload();
      } else {
        const errorData = await response.json();
        console.error("Update failed. Server response:", errorData);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  console.log(props.financialReports);

  const hasReports = props.financialReports.length > 0;

  return (
    <NavbarLayout currentPage="taxCalculator">
      <Head>
        <title>Nodokļu kalkulators</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      {hasReports ? (
        <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
          <div className="flex flex-col shrink-0 pr-5">
            <p className="text-lg">Balstoties uz atskaites datiem ir iespējams veikt nodokļu aprēķinu 2023.gadam</p>
            <p className="pb-3">
              Izvēlētā atskaite: <b>{selectedReport?.title}</b>
            </p>
            <div className="w-1/2">
              <DropdownReportsList financialReports={props.financialReports} onSelectReport={handleReportSelect} selectedReport={selectedReport} />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/2">
              <Card className="flex flex-col p-7 mr-5 h-3/5">
                <div className="mb-3">
                  <Label>Apgādājamo skaits</Label>
                  <select
                    className="mt-1 ml-2 p-2 outline outline-slate-200 outline-1 rounded"
                    value={apgadajamoSkaits}
                    onChange={handleApgadajamoSkaitsChange}
                  >
                    {numberOptions.map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <Label>Papildus nodokļu atvieglojumi</Label>
                  <Input className="mt-1" type="number" min="0" step="0.01" onChange={handleUserInput1Change} />
                </div>
                <div className="flex flex-row mb-4">
                  <Label>Algas nodokļu grāmatiņa ir iesniegta</Label>
                  <Input className="ml-2 h-4 w-4" type="checkbox" checked={isAlgasGramatinaChecked} onChange={handleCheckbox1Change} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <Label>Norādīt precīzu neapliekamo minimumu</Label>
                    <Input className="ml-2 h-4 w-4" type="checkbox" checked={isNeapliekamaisMinimumsChecked} onChange={handleCheckbox2Change} />
                  </div>
                  {isNeapliekamaisMinimumsChecked && <Input className="mt-2" type="number" min="0" step="0.01" onChange={handleUserInput2Change} />}
                </div>
              </Card>
              {!isNetIncomeSame && (
                <Card className="p-7 mt-2 mr-5 mb-5">
                  <p className="font-medium mb-1">Aprēķinātie neto ienākumi nesakrīt ar atskaites neto ienākumiem</p>
                  <p>Atskaitē: €{(selectedReport?.taxedIncome ?? 0).toFixed(2)}</p>
                  <p>Aprēķinātie: €{result.netIncome.toFixed(2)}</p>
                  {result.netIncome <= 0 && <p className="flex text-red-600 justify-center text-sm">Aprēķinātie dati nav korekti</p>}
                  <Button className="bg-black mt-2" onClick={handleUpdate}>
                    Atjaunināt datus
                  </Button>
                </Card>
              )}
            </div>
            <Card className="flex flex-col justify-around p-10">
              <Card className="p-2">Bruto ienākumi: €{(selectedReport?.totalIncome ?? 0).toFixed(2)}</Card>
              <Card className="p-2">Piemērojamais neapliekamais minimums: €{result.untaxedMinimum.toFixed(2)}</Card>
              <Card className="p-2">Atvieglojums par apgādībā esošām personām: €{result.taxCuts.toFixed(2)}</Card>
              <Card className="p-2">Valsts sociālās apdrošināšanas obligātās iemaksas: €{result.vsaoi.toFixed(2)}</Card>
              <Card className="p-2">Iedzīvotāju ienākumu nodoklis: €{result.incomeTax.toFixed(2)}</Card>
              <Card className="p-2">Aprēķinātie neto ienākumi: €{result.netIncome.toFixed(2)}</Card>
            </Card>
          </div>
        </div>
      ) : (
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

export default TaxCalculator;

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
