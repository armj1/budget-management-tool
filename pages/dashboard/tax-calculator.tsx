import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FinancialRecord from "@/interfaces/FinancialRecord";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";

const TaxCalculator = () => {
  const [apgadajamoSkaits, setApgadajamoSkaits] = useState(0);
  const [isAlgasGramatinaChecked, setIsAlgasGramatinaChecked] = useState(false);
  const [isNeapliekamaisMinimumsChecked, setIsNeapliekamaisMinimumsChecked] = useState();
  const [preciseNeapliekamaisMinimums, setPreciseNeapliekamaisMinimums] = useState(0);
  const [additionalTaxCuts, setAdditionalTaxCuts] = useState(0);
  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);
  const [selectedReport, setSelectedReport] = useState<FinancialRecord>();
  const [isNetIncomeSame, setIsNetIncomeSame] = useState(true);

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
    const vsaoi = Math.round((income * 0.105) * 100) / 100;

    if (isNeapliekamaisMinimumsChecked) {
      untaxedMinimum = Math.round(preciseNeapliekamaisMinimumsValue * 100) / 100;
    } else if (isAlgasGramatinaChecked === false || income > 1799) {
      untaxedMinimum = 0;
    } else {
      untaxedMinimum = (6000 - 0.38462 * (income * 12 * 1.06 - 6000)) / 12;
      untaxedMinimum = Math.min(untaxedMinimum, 500);
      untaxedMinimum = Math.round(untaxedMinimum*100)/100
    }

    if (isAlgasGramatinaChecked === false) {
      taxCuts = 0;
    } else {
      taxCuts = 250 * apgadajamoSkaits;
    }

    if (income * 12 <= 20004) {
      incomeTax = Math.max((income - vsaoi - untaxedMinimum - taxCuts - additionalTaxCutsValue) * 0.2, 0);
      incomeTax = Math.round(incomeTax * 100) / 100;
    } else if (income * 12 <= 78100) {
      incomeTax = Math.max((income - vsaoi - untaxedMinimum - taxCuts - additionalTaxCutsValue) * 0.23, 0);
      incomeTax = Math.round(incomeTax * 100) / 100;
    } else if (income * 12 > 78100) {
      incomeTax = Math.max((income - vsaoi - untaxedMinimum - taxCuts - additionalTaxCutsValue) * 0.3, 0);
      incomeTax = Math.round(incomeTax * 100) / 100;
    }

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
      } else if (response.status === 400 || 500) {
        const errorData = await response.json();
        console.error("Update failed. Server response:", errorData);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <NavbarLayout>
      <Head>
        <title>Tax calculator</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="flex flex-col shrink-0 pr-5">
          <p className="text-lg">Balstoties uz atskaites datiem ir iespējams veikt nodokļu aprēķinu 2023.gadam</p>
          <p className="pb-3">
            Izvēlētā atskaite: <b>{selectedReport?.title}</b>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-1/2" variant="outline">
                Pieejamās atskaites
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 ml-5">
              {financialReports &&
                financialReports.map((report) => (
                  <DropdownMenuItem key={report.id} onClick={() => handleReportSelect(report)}>
                    {report.title}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <Card className="flex flex-col p-7 mr-5 h-3/5">
              <div className="mb-3">
                <Label>Apgādājamo skaits</Label>
                <select className="mt-1 ml-2 p-2 outline outline-slate-200 outline-1 rounded" value={apgadajamoSkaits} onChange={handleApgadajamoSkaitsChange}>
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
                <p>Atskaitē: €{selectedReport?.taxedIncome}</p>
                <p>Aprēķinātie: €{result.netIncome}</p>
                <Button className="bg-black mt-2" onClick={handleUpdate} >Atjaunot datus</Button>
              </Card>
            )}
          </div>
          <Card className="flex flex-col justify-around p-10">
            <Card className="p-2">Bruto ienākumi: €{selectedReport?.totalIncome}</Card>
            <Card className="p-2">Piemērojamais neapliekamais minimums: €{result.untaxedMinimum}</Card>
            <Card className="p-2">Atvieglojums par apgādībā esošām personām: €{result.taxCuts}</Card>
            <Card className="p-2">Valsts sociālās apdrošināšanas obligātās iemaksas: €{result.vsaoi}</Card>
            <Card className="p-2">Iedzīvotāju ienākumu nodoklis: €{result.incomeTax}</Card>
            <Card className="p-2">Aprēķinātie neto ienākumi: €{result.netIncome}</Card>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default TaxCalculator;
