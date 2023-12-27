import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import router from "next/router";
import { useState } from "react";

const NewBudgetReport = () => {
  const [formData, setFormData] = useState({
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
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async () => {
    try {
      if (parseFloat(formData.taxedIncome) > parseFloat(formData.totalIncome)) {
        alert("Neto ienākumi nedrīkst pārsniegt bruto ienākumus!");
        return;
      }

      const response = await fetch("/api/addFinancialRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Financial record created:", data.financialRecord);
        router.reload();
      } else if (response.status === 400 || 500) {
        alert(
          "Pārbaudiet ievadītos datus! Lauki nedrīkst būt tukši un ienākumi nedrīkst būt 0"
        );
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <NavbarLayout>
      <Head>
        <title>Create new financial report</title>
        <link
          rel="icon"
          href="/circle-dollar-sign.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-center">
        <div className="flex flex-col">
          <p className="flex justify-center text-lg pb-3">
            Lai izveidotu budžeta atskaiti, lūdzu, ievadiet vajadzīgo
            informāciju
          </p>
          <Card className="flex flex-col p-10">
            <div className="flex flex-row pb-5">
              <div className="pr-10">
                <p className="font-medium mb-2">Atskaites nosaukums</p>
                <Input
                  className="mb-2"
                  placeholder="Atskaites nosaukums"
                  value={formData.title}
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
                <p className="font-medium mb-2 mt-6">Ienākumi</p>
                <Input
                  className="mb-2"
                  placeholder="Bruto ienākumi"
                  value={formData.totalIncome}
                  type="number"
                  min="0"
                  name="totalIncome"
                  onChange={handleChange}
                />
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
                <Input
                  className="mb-2 mt-8"
                  placeholder="Transports"
                  value={formData.transportSpending}
                  type="number"
                  min="0"
                  name="transportSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Pārtika"
                  value={formData.foodSpending}
                  type="number"
                  min="0"
                  name="foodSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2 mr-7"
                  placeholder="Veselība / skaistumkopšana"
                  value={formData.healthSpending}
                  type="number"
                  min="0"
                  name="healthSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Bērni"
                  value={formData.childSpending}
                  type="number"
                  min="0"
                  name="childSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2 mr-7"
                  placeholder="Iepirkšanās / pakalpojumi"
                  value={formData.shoppingSpending}
                  type="number"
                  min="0"
                  name="shoppingSpending"
                  onChange={handleChange}
                />
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
                <Input
                  className="mb-2 mt-8"
                  placeholder="Izglītība"
                  value={formData.educationSpending}
                  type="number"
                  min="0"
                  name="educationSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Atpūta"
                  value={formData.recreationSpending}
                  type="number"
                  min="0"
                  name="recreationSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Apdrošināšana"
                  value={formData.insuranceSpending}
                  type="number"
                  min="0"
                  name="insuranceSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Ieguldījumi / uzkrājumi"
                  value={formData.investmentSpending}
                  type="number"
                  min="0"
                  name="investmentSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Mājdzīvnieki"
                  value={formData.petSpending}
                  type="number"
                  min="0"
                  name="petSpending"
                  onChange={handleChange}
                />
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

            <Button className="bg-black" onClick={onSubmit}>
              Iesniegt
            </Button>
          </Card>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default NewBudgetReport;
