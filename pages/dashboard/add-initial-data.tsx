import BudgetReportCard from "@/components/budgetReportCard";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const AddInitialData = (data: any) => {
  const router = useRouter();

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
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
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
        alert("Pārbaudiet ievadītos datus! Lauki nedrīkst būt tukši un ienākumi nedrīkst būt 0");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
          <BudgetReportCard formData={formData} handleChange={handleChange} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};
export default AddInitialData;
