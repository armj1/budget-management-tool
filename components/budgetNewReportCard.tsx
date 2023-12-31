import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/router";

const BudgetNewReportCard = () => {
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

  const [showTitleError, setShowTitleError] = useState(false);
  const [showTotalIncomeEmptyError, setShowTotalIncomeEmptyError] = useState(false);
  const [showTotalIncomeDecimalError, setShowTotalIncomeDecimalError] = useState(false);
  const [showTaxedIncomeEmptyError, setShowTaxedIncomeEmptyError] = useState(false);
  const [showTaxedIncomeDecimalError, setShowTaxedIncomeDecimalError] = useState(false);
  const [showHousingEmptyError, setShowHousingEmptyError] = useState(false);
  const [showHousingDecimalError, setShowHousingDecimalError] = useState(false);
  const [showTransportEmptyError, setShowTransportEmptyError] = useState(false);
  const [showTransportDecimalError, setShowTransportDecimalError] = useState(false);
  const [showFoodEmptyError, setShowFoodEmptyError] = useState(false);
  const [showFoodDecimalError, setShowFoodDecimalError] = useState(false);
  const [showHealthEmptyError, setShowHealthEmptyError] = useState(false);
  const [showHealthDecimalError, setShowHealthDecimalError] = useState(false);
  const [showChildEmptyError, setShowChildEmptyError] = useState(false);
  const [showChildDecimalError, setShowChildDecimalError] = useState(false);
  const [showShoppingEmptyError, setShowShoppingEmptyError] = useState(false);
  const [showShoppingDecimalError, setShowShoppingDecimalError] = useState(false);
  const [showLeisureEmptyError, setShowLeisureEmptyError] = useState(false);
  const [showLeisureDecimalError, setShowLeisureDecimalError] = useState(false);
  const [showEducationEmptyError, setShowEducationEmptyError] = useState(false);
  const [showEducationDecimalError, setShowEducationDecimalError] = useState(false);
  const [showRecreationEmptyError, setShowRecreationEmptyError] = useState(false);
  const [showRecreationDecimalError, setShowRecreationDecimalError] = useState(false);
  const [showInsuranceEmptyError, setShowInsuranceEmptyError] = useState(false);
  const [showInsuranceDecimalError, setShowInsuranceDecimalError] = useState(false);
  const [showInvestmentEmptyError, setShowInvestmentEmptyError] = useState(false);
  const [showInvestmentDecimalError, setShowInvestmentDecimalError] = useState(false);
  const [showPetEmptyError, setShowPetEmptyError] = useState(false);
  const [showPetDecimalError, setShowPetDecimalError] = useState(false);
  const [showOtherEmptyError, setShowOtherEmptyError] = useState(false);
  const [showOtherDecimalError, setShowOtherDecimalError] = useState(false);

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
      }

      if (formData.title.trim() === "") {
        setShowTitleError(true);
      } else {
        setShowTitleError(false);
      }

      const decimalRegex = /^\d+(\.\d{1,2})?$/;
      if (formData.totalIncome === "" || formData.totalIncome === null || formData.totalIncome === undefined) {
        setShowTotalIncomeEmptyError(true);
      } else {
        setShowTotalIncomeEmptyError(false);
      }
      if (!decimalRegex.test(formData.totalIncome)) {
        setShowTotalIncomeDecimalError(true);
      } else {
        setShowTotalIncomeDecimalError(false);
      }

      if (formData.taxedIncome === "" || formData.taxedIncome === null || formData.taxedIncome === undefined) {
        setShowTaxedIncomeEmptyError(true);
      } else {
        setShowTaxedIncomeEmptyError(false);
      }
      if (!decimalRegex.test(formData.taxedIncome)) {
        setShowTaxedIncomeDecimalError(true);
      } else {
        setShowTaxedIncomeDecimalError(false);
      }

      if (formData.housingSpending === "" || formData.housingSpending === null || formData.housingSpending === undefined) {
        setShowHousingEmptyError(true);
      } else {
        setShowHousingEmptyError(false);
      }
      if (!decimalRegex.test(formData.housingSpending)) {
        setShowHousingDecimalError(true);
      } else {
        setShowHousingDecimalError(false);
      }

      if (formData.transportSpending === "" || formData.transportSpending === null || formData.transportSpending === undefined) {
        setShowTransportEmptyError(true);
      } else {
        setShowTransportEmptyError(false);
      }
      if (!decimalRegex.test(formData.transportSpending)) {
        setShowTransportDecimalError(true);
      } else {
        setShowTransportDecimalError(false);
      }

      if (formData.foodSpending === "" || formData.foodSpending === null || formData.foodSpending === undefined) {
        setShowFoodEmptyError(true);
      } else {
        setShowFoodEmptyError(false);
      }
      if (!decimalRegex.test(formData.foodSpending)) {
        setShowFoodDecimalError(true);
      } else {
        setShowFoodDecimalError(false);
      }

      if (formData.healthSpending === "" || formData.healthSpending === null || formData.healthSpending === undefined) {
        setShowHealthEmptyError(true);
      } else {
        setShowHealthEmptyError(false);
      }
      if (!decimalRegex.test(formData.healthSpending)) {
        setShowHealthDecimalError(true);
      } else {
        setShowHealthDecimalError(false);
      }

      if (formData.childSpending === "" || formData.childSpending === null || formData.childSpending === undefined) {
        setShowChildEmptyError(true);
      } else {
        setShowChildEmptyError(false);
      }
      if (!decimalRegex.test(formData.childSpending)) {
        setShowChildDecimalError(true);
      } else {
        setShowChildDecimalError(false);
      }

      if (formData.shoppingSpending === "" || formData.shoppingSpending === null || formData.shoppingSpending === undefined) {
        setShowShoppingEmptyError(true);
      } else {
        setShowShoppingEmptyError(false);
      }
      if (!decimalRegex.test(formData.shoppingSpending)) {
        setShowShoppingDecimalError(true);
      } else {
        setShowShoppingDecimalError(false);
      }

      if (formData.leisureSpending === "" || formData.leisureSpending === null || formData.leisureSpending === undefined) {
        setShowLeisureEmptyError(true);
      } else {
        setShowLeisureEmptyError(false);
      }
      if (!decimalRegex.test(formData.leisureSpending)) {
        setShowLeisureDecimalError(true);
      } else {
        setShowLeisureDecimalError(false);
      }

      if (formData.educationSpending === "" || formData.educationSpending === null || formData.educationSpending === undefined) {
        setShowEducationEmptyError(true);
      } else {
        setShowEducationEmptyError(false);
      }
      if (!decimalRegex.test(formData.educationSpending)) {
        setShowEducationDecimalError(true);
      } else {
        setShowEducationDecimalError(false);
      }

      if (formData.recreationSpending === "" || formData.recreationSpending === null || formData.recreationSpending === undefined) {
        setShowRecreationEmptyError(true);
      } else {
        setShowRecreationEmptyError(false);
      }
      if (!decimalRegex.test(formData.recreationSpending)) {
        setShowRecreationDecimalError(true);
      } else {
        setShowRecreationDecimalError(false);
      }

      if (formData.insuranceSpending === "" || formData.insuranceSpending === null || formData.insuranceSpending === undefined) {
        setShowInsuranceEmptyError(true);
      } else {
        setShowInsuranceEmptyError(false);
      }
      if (!decimalRegex.test(formData.insuranceSpending)) {
        setShowInsuranceDecimalError(true);
      } else {
        setShowInsuranceDecimalError(false);
      }

      if (formData.investmentSpending === "" || formData.investmentSpending === null || formData.investmentSpending === undefined) {
        setShowInvestmentEmptyError(true);
      } else {
        setShowInvestmentEmptyError(false);
      }
      if (!decimalRegex.test(formData.investmentSpending)) {
        setShowInvestmentDecimalError(true);
      } else {
        setShowInvestmentDecimalError(false);
      }

      if (formData.petSpending === "" || formData.petSpending === null || formData.petSpending === undefined) {
        setShowPetEmptyError(true);
      } else {
        setShowPetEmptyError(false);
      }
      if (!decimalRegex.test(formData.petSpending)) {
        setShowPetDecimalError(true);
      } else {
        setShowPetDecimalError(false);
      }

      if (formData.otherSpending === "" || formData.otherSpending === null || formData.otherSpending === undefined) {
        setShowOtherEmptyError(true);
      } else {
        setShowOtherEmptyError(false);
      }
      if (!decimalRegex.test(formData.otherSpending)) {
        setShowOtherDecimalError(true);
      } else {
        setShowOtherDecimalError(false);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Card className="flex flex-col p-10">
      <div className="flex flex-row pb-5">
        <div className="pr-10">
          <div className="flex flex-col mb-2">
            <p className="font-medium mb-2">Atskaites nosaukums</p>
            <Input placeholder="Atskaites nosaukums" value={formData.title} type="text" name="title" onChange={handleChange} />
            {showTitleError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
          </div>
          <p className="font-medium mb-2 mt-6">Ienākumi</p>
          <div className="flex flex-col mb-2">
            <Label className="mb-1">Bruto ienākumi</Label>
            <Input placeholder="Bruto ienākumi" value={formData.totalIncome} type="number" min="0" name="totalIncome" onChange={handleChange} />
            {showTotalIncomeEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showTotalIncomeDecimalError && !showTotalIncomeEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showTaxedIncomeEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showTaxedIncomeDecimalError && !showTaxedIncomeEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <p className="font-medium mb-2">Izdevumi</p>
          <div className="flex flex-col mb-2">
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
            {showHousingEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showHousingDecimalError && !showHousingEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
        </div>
        <div className="pr-10">
          <div className="flex flex-col mb-2">
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
            {showTransportEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showTransportDecimalError && !showTransportEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <Label>Pārtika</Label>
            <Input
              className="mb-2"
              placeholder="Pārtika"
              value={formData.foodSpending}
              type="number"
              min="0"
              name="foodSpending"
              onChange={handleChange}
            />
            {showFoodEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showFoodDecimalError && !showFoodEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showHealthEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showHealthDecimalError && !showHealthEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <Label>Bērni</Label>
            <Input
              className="mb-2"
              placeholder="Bērni"
              value={formData.childSpending}
              type="number"
              min="0"
              name="childSpending"
              onChange={handleChange}
            />
            {showChildEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showChildDecimalError && !showChildEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showShoppingEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showShoppingDecimalError && !showShoppingEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showLeisureEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showLeisureDecimalError && !showLeisureEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col mb-2">
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
            {showEducationEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showEducationDecimalError && !showEducationEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showRecreationEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showRecreationDecimalError && !showRecreationEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showInsuranceEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showInsuranceDecimalError && !showInsuranceEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showInvestmentEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showInvestmentDecimalError && !showInvestmentEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showPetEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showPetDecimalError && !showPetEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
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
            {showOtherEmptyError && <p className="flex text-red-600 justify-center text-sm">Lauks nevar būt tukšs</p>}
            {showOtherDecimalError && !showOtherEmptyError && (
              <p className="flex text-red-600 justify-center text-sm">Ne vairāk par 2 cipariem aiz komata</p>
            )}
          </div>
        </div>
      </div>
      <Button className="bg-black" onClick={onSubmit}>
        Iesniegt
      </Button>
    </Card>
  );
};

export default BudgetNewReportCard;
