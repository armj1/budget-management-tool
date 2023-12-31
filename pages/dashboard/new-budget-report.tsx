import BudgetReportCard from "@/components/budgetReportCard";
import NavbarLayout from "@/components/navbar-layout";
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
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async () => {
    try {
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
    <NavbarLayout currentPage="newBudgetReport">
      <Head>
        <title>Izveidot jaunu budžeta atskaiti</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-center">
        <div className="flex flex-col">
          <p className="flex justify-center text-lg pb-3">Lai izveidotu budžeta atskaiti, lūdzu, ievadiet vajadzīgo informāciju</p>
          <BudgetReportCard formData={formData} handleChange={handleChange} onSubmit={onSubmit} />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default NewBudgetReport;
