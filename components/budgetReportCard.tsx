import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface BudgetReportCardProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const BudgetReportCard = (props: BudgetReportCardProps) => {
  const [showTitleError, setShowTitleError] = useState(false);

  const validateFields = () => {
    if (props.formData.title.trim() === "") {
      setShowTitleError(true);
    } else {
      setShowTitleError(false);
    }

    if (props.formData.totalIncome.trim() === "") {
    }

    if (props.formData.taxedIncome.trim() === "") {
    }

    if (props.formData.taxedIncome > props.formData.totalIncome) {
    }

    if (props.formData.housingSpending.trim() === "") {
    }

    return true
  };

  return (
    <Card className="flex flex-col p-10">
      <div className="flex flex-row pb-5">
        <div className="pr-10">
          <p className="font-medium mb-2">Atskaites nosaukums</p>
          <Input
            className="mb-2"
            placeholder="Atskaites nosaukums"
            value={props.formData.title}
            type="text"
            name="title"
            onChange={props.handleChange}
          />
          <p className="font-medium mb-2 mt-6">Ienākumi</p>
          <Label>Bruto ienākumi</Label>
          <Input
            className="mb-2"
            placeholder="Bruto ienākumi"
            value={props.formData.totalIncome}
            type="number"
            min="0"
            name="totalIncome"
            onChange={props.handleChange}
          />
          <Label>Neto ienākumi</Label>
          <Input
            className="mb-6"
            placeholder="Neto ienākumi"
            value={props.formData.taxedIncome}
            type="number"
            min="0"
            name="taxedIncome"
            onChange={props.handleChange}
          />
          <p className="font-medium mb-2">Izdevumi</p>
          <Label>Mājoklis</Label>
          <Input
            className="mb-2"
            placeholder="Mājoklis"
            value={props.formData.housingSpending}
            type="number"
            min="0"
            name="housingSpending"
            onChange={props.handleChange}
          />
        </div>
        <div className="pr-10">
          <Label className="mt-8">Transports</Label>
          <Input
            className="mb-2 "
            placeholder="Transports"
            value={props.formData.transportSpending}
            type="number"
            min="0"
            name="transportSpending"
            onChange={props.handleChange}
          />
          <Label>Pārtika</Label>
          <Input
            className="mb-2"
            placeholder="Pārtika"
            value={props.formData.foodSpending}
            type="number"
            min="0"
            name="foodSpending"
            onChange={props.handleChange}
          />
          <Label>Veselība / skaistumkopšana</Label>
          <Input
            className="mb-2 mr-7"
            placeholder="Veselība / skaistumkopšana"
            value={props.formData.healthSpending}
            type="number"
            min="0"
            name="healthSpending"
            onChange={props.handleChange}
          />
          <Label>Bērni</Label>
          <Input
            className="mb-2"
            placeholder="Bērni"
            value={props.formData.childSpending}
            type="number"
            min="0"
            name="childSpending"
            onChange={props.handleChange}
          />
          <Label>Iepirkšanās / pakalpojumi</Label>
          <Input
            className="mb-2 mr-7"
            placeholder="Iepirkšanās / pakalpojumi"
            value={props.formData.shoppingSpending}
            type="number"
            min="0"
            name="shoppingSpending"
            onChange={props.handleChange}
          />
          <Label>Brīvais laiks / izklaide</Label>
          <Input
            className="mb-2"
            placeholder="Brīvais laiks / izklaide"
            value={props.formData.leisureSpending}
            type="number"
            min="0"
            name="leisureSpending"
            onChange={props.handleChange}
          />
        </div>
        <div>
          <Label className="mt-8">Izglītība</Label>
          <Input
            className="mb-2"
            placeholder="Izglītība"
            value={props.formData.educationSpending}
            type="number"
            min="0"
            name="educationSpending"
            onChange={props.handleChange}
          />
          <Label>Atpūta</Label>
          <Input
            className="mb-2"
            placeholder="Atpūta"
            value={props.formData.recreationSpending}
            type="number"
            min="0"
            name="recreationSpending"
            onChange={props.handleChange}
          />
          <Label>Apdrošināšana</Label>
          <Input
            className="mb-2"
            placeholder="Apdrošināšana"
            value={props.formData.insuranceSpending}
            type="number"
            min="0"
            name="insuranceSpending"
            onChange={props.handleChange}
          />
          <Label>Ieguldījumi / uzkrājumi</Label>
          <Input
            className="mb-2"
            placeholder="Ieguldījumi / uzkrājumi"
            value={props.formData.investmentSpending}
            type="number"
            min="0"
            name="investmentSpending"
            onChange={props.handleChange}
          />
          <Label>Mājdzīvnieki</Label>
          <Input
            className="mb-2"
            placeholder="Mājdzīvnieki"
            value={props.formData.petSpending}
            type="number"
            min="0"
            name="petSpending"
            onChange={props.handleChange}
          />
          <Label>Citi izdevumi</Label>
          <Input
            className="mb-2"
            placeholder="Citi izdevumi"
            value={props.formData.otherSpending}
            type="number"
            min="0"
            name="otherSpending"
            onChange={props.handleChange}
          />
        </div>
      </div>
      <Button className="bg-black" onClick={props.onSubmit}>
        Rediģēt
      </Button>
    </Card>
  );
};

export default BudgetReportCard;
