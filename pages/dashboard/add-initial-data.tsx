import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

const AddInitialData = (data: any) => {
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/addFinances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Financial record created:", data.financialRecord);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div className="bg-green-200 h-screen">
        <Head>
          <title>Add initial data</title>
          <link rel="icon" href="/tab_icon.ico" />
        </Head>
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-between w-full pr-5">
            <div className="invisible">cccccccccccccccc</div>
            <div className="flex flex-col items-center">
              <h1 className="mt-5 text-xl">
                Paldies par reģistrāciju, <b>{data.firstName}</b>!
              </h1>
              <p className="text-l mb-5">
                Pirms rīka izmantošanas, lūdzu, ievadiet zemāk prasīto
                informāciju
              </p>
            </div>
            <Button
              className="flex mt-7 ml-50"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Atteikties
            </Button>
          </div>
          <Card className="flex flex-col p-10">
            <div className="flex flex-row pb-5">
              <div className="pr-10">
                <p className="font-medium mb-2">Ienākumi</p>
                <Input
                  className="mb-2"
                  placeholder="Bruto alga"
                  value={formData.totalIncome}
                  type="number"
                  name="totalIncome"
                  onChange={handleChange}
                  />
                <Input
                  className="mb-6"
                  placeholder="Neto alga"
                  value={formData.taxedIncome}
                  type="number"
                  name="taxedIncome"
                  onChange={handleChange}
                />
                <p className="font-medium mb-2">Izdevumi</p>
                <Input
                  className="mb-2"
                  placeholder="Mājoklis"
                  value={formData.housingSpending}
                  type="number"
                  name="housingSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Transports"
                  value={formData.transportSpending}
                  type="number"
                  name="transportSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Pārtika"
                  value={formData.foodSpending}
                  type="number"
                  name="foodSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2 mr-3"
                  placeholder="Veselība / skaistumkopšana"
                  value={formData.healthSpending}
                  type="number"
                  name="healthSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Bērni"
                  value={formData.childSpending}
                  type="number"
                  name="childSpending"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  className="mt-8 mb-2"
                  placeholder="Iepirkšanās / pakalpojumi"
                  value={formData.shoppingSpending}
                  type="number"
                  name="shoppingSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Brīvais laiks / izklaide"
                  value={formData.leisureSpending}
                  type="number"
                  name="leisureSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Izglītība"
                  value={formData.educationSpending}
                  type="number"
                  name="educationSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Atpūta"
                  value={formData.recreationSpending}
                  type="number"
                  name="recreationSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Apdrošināšana"
                  value={formData.insuranceSpending}
                  type="number"
                  name="insuranceSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Ieguldījumi / uzkrājumi"
                  value={formData.investmentSpending}
                  type="number"
                  name="investmentSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Mājdzīvnieki"
                  value={formData.petSpending}
                  type="number"
                  name="petSpending"
                  onChange={handleChange}
                />
                <Input
                  className="mb-2"
                  placeholder="Citi izdevumi"
                  value={formData.otherSpending}
                  type="number"
                  name="otherSpending"
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button onClick={onSubmit}>Iesniegt</Button>
          </Card>
        </div>
      </div>
    </>
  );
};
export default AddInitialData;
