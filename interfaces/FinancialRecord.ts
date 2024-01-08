import User from "./User";

// Datu tipu definēšana budžeta atskaites datiem (ne datu bāzē)
interface FinancialRecord {
  id: string;
  userId: string;
  user: User;  // Atsauce uz lietotāja datu shēmu
  date: Date;
  title: string;
  totalIncome: number;
  taxedIncome: number;
  housingSpending: number;
  transportSpending: number;
  childSpending: number;
  healthSpending: number;
  insuranceSpending: number;
  shoppingSpending: number;
  leisureSpending: number;
  educationSpending: number;
  recreationSpending: number;
  investmentSpending: number;
  petSpending: number;
  foodSpending: number;
  otherSpending: number;
  leftoverMoney: number;
}

export default FinancialRecord;
