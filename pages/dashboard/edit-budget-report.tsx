import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Head from "next/head";
import { useEffect, useState } from "react";
import FinancialRecord from "@/interfaces/FinancialRecord";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import router from "next/router";
import { Label } from "@/components/ui/label";

const EditBudgetReport = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    totalIncome: "",
    taxedIncome: "",
    housingSpending: "",
    transportSpending: "",
    childSpending: "",
    healthSpending: "",
    insuranceSpending: "",
    shoppingSpending: "",
    leisureSpending: "",
    educationSpending: "",
    recreationSpending: "",
    investmentSpending: "",
    petSpending: "",
    foodSpending: "",
    otherSpending: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const [financialReports, setFinancialReports] = useState<FinancialRecord[]>([]);

  console.log(financialReports);
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
    setFormData({
      id: report.id,
      title: report.title,
      totalIncome: String(report.totalIncome),
      taxedIncome: String(report.taxedIncome),
      housingSpending: String(report.housingSpending),
      transportSpending: String(report.transportSpending),
      childSpending: String(report.childSpending),
      healthSpending: String(report.healthSpending),
      insuranceSpending: String(report.insuranceSpending),
      shoppingSpending: String(report.shoppingSpending),
      leisureSpending: String(report.leisureSpending),
      educationSpending: String(report.educationSpending),
      recreationSpending: String(report.recreationSpending),
      investmentSpending: String(report.investmentSpending),
      petSpending: String(report.petSpending),
      foodSpending: String(report.foodSpending),
      otherSpending: String(report.otherSpending),
    });
  };

  const convertFormData = (formData: any) => {
    return {
      id: formData.id,
      title: formData.title,
      totalIncome: parseFloat(formData.totalIncome),
      taxedIncome: parseFloat(formData.taxedIncome),
      housingSpending: parseFloat(formData.housingSpending),
      transportSpending: parseFloat(formData.transportSpending),
      childSpending: parseFloat(formData.childSpending),
      healthSpending: parseFloat(formData.healthSpending),
      insuranceSpending: parseFloat(formData.insuranceSpending),
      shoppingSpending: parseFloat(formData.shoppingSpending),
      leisureSpending: parseFloat(formData.leisureSpending),
      educationSpending: parseFloat(formData.educationSpending),
      recreationSpending: parseFloat(formData.recreationSpending),
      investmentSpending: parseFloat(formData.investmentSpending),
      petSpending: parseFloat(formData.petSpending),
      foodSpending: parseFloat(formData.foodSpending),
      otherSpending: parseFloat(formData.otherSpending),
    };
  };

  const handleUpdate = async () => {
    const numericFormData = convertFormData(formData);

    try {
      if (parseFloat(formData.taxedIncome) > parseFloat(formData.totalIncome)) {
        alert("Neto ienākumi nedrīkst pārsniegt bruto ienākumus!");
        return;
      }

      const response = await fetch("/api/updateFinancialRecord", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(numericFormData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Financial record updated:", data.financialRecord);
        router.reload();
      } else if (response.status === 400 || 500) {
        const errorData = await response.json();
        console.error("Update failed. Server response:", errorData);
        alert("Pārbaudiet ievadītos datus! Lauki nedrīkst būt tukši un ienākumi nedrīkst būt 0");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <NavbarLayout currentPage="editBudgetReport">
      <Head>
        <title>Rediģēt budžeta atskaiti</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="flex flex-col">
          <p className="text-lg pb-2">Pirms rediģēšanas, lūdzu, izvēlieties vajadzīgo atskaiti sarakstā</p>
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
        <div>
          <Card className="flex flex-col p-10">
            <div className="flex flex-row pb-5">
              <div className="pr-10">
                <p className="font-medium mb-2">Atskaites nosaukums</p>
                <Input className="mb-2" placeholder="Atskaites nosaukums" value={formData.title} type="text" name="title" onChange={handleChange} />
                <p className="font-medium mb-2 mt-6">Ienākumi</p>
                <Label>Bruto ienākumi</Label>
                <Input
                  className="mb-2"
                  placeholder="Bruto ienākumi"
                  value={formData.totalIncome}
                  type="number"
                  min="0"
                  name="totalIncome"
                  onChange={handleChange}
                />
                <Label>Neto ienākumi</Label>
                <Input
                  className="mb-6"
                  placeholder="Neto ienākumi"
                  value={formData.taxedIncome}
                  type="number"
                  min="0"
                  name="taxedIncome"
                  onChange={handleChange}
                />
                <p className="font-medium mb-2">Izdevumi</p>
                <Label>Mājoklis</Label>
                <Input
                  className="mb-2"
                  placeholder="Mājoklis"
                  value={formData.housingSpending}
                  type="number"
                  min="0"
                  name="housingSpending"
                  onChange={handleChange}
                />
              </div>
              <div className="pr-10">
                <Label className="mt-8">Transports</Label>
                <Input
                  className="mb-2 "
                  placeholder="Transports"
                  value={formData.transportSpending}
                  type="number"
                  min="0"
                  name="transportSpending"
                  onChange={handleChange}
                />
                <Label>Pārtika</Label>
                <Input className="mb-2" placeholder="Pārtika" value={formData.foodSpending} type="number" min="0" name="foodSpending" onChange={handleChange} />
                <Label>Veselība / skaistumkopšana</Label>
                <Input
                  className="mb-2 mr-7"
                  placeholder="Veselība / skaistumkopšana"
                  value={formData.healthSpending}
                  type="number"
                  min="0"
                  name="healthSpending"
                  onChange={handleChange}
                />
                <Label>Bērni</Label>
                <Input className="mb-2" placeholder="Bērni" value={formData.childSpending} type="number" min="0" name="childSpending" onChange={handleChange} />
                <Label>Iepirkšanās / pakalpojumi</Label>
                <Input
                  className="mb-2 mr-7"
                  placeholder="Iepirkšanās / pakalpojumi"
                  value={formData.shoppingSpending}
                  type="number"
                  min="0"
                  name="shoppingSpending"
                  onChange={handleChange}
                />
                <Label>Brīvais laiks / izklaide</Label>
                <Input
                  className="mb-2"
                  placeholder="Brīvais laiks / izklaide"
                  value={formData.leisureSpending}
                  type="number"
                  min="0"
                  name="leisureSpending"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="mt-8">Izglītība</Label>
                <Input
                  className="mb-2"
                  placeholder="Izglītība"
                  value={formData.educationSpending}
                  type="number"
                  min="0"
                  name="educationSpending"
                  onChange={handleChange}
                />
                <Label>Atpūta</Label>
                <Input
                  className="mb-2"
                  placeholder="Atpūta"
                  value={formData.recreationSpending}
                  type="number"
                  min="0"
                  name="recreationSpending"
                  onChange={handleChange}
                />
                <Label>Apdrošināšana</Label>
                <Input
                  className="mb-2"
                  placeholder="Apdrošināšana"
                  value={formData.insuranceSpending}
                  type="number"
                  min="0"
                  name="insuranceSpending"
                  onChange={handleChange}
                />
                <Label>Ieguldījumi / uzkrājumi</Label>
                <Input
                  className="mb-2"
                  placeholder="Ieguldījumi / uzkrājumi"
                  value={formData.investmentSpending}
                  type="number"
                  min="0"
                  name="investmentSpending"
                  onChange={handleChange}
                />
                <Label>Mājdzīvnieki</Label>
                <Input
                  className="mb-2"
                  placeholder="Mājdzīvnieki"
                  value={formData.petSpending}
                  type="number"
                  min="0"
                  name="petSpending"
                  onChange={handleChange}
                />
                <Label>Citi izdevumi</Label>
                <Input
                  className="mb-2"
                  placeholder="Citi izdevumi"
                  value={formData.otherSpending}
                  type="number"
                  min="0"
                  name="otherSpending"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button className="bg-black" onClick={handleUpdate}>
              Rediģēt
            </Button>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default EditBudgetReport;
