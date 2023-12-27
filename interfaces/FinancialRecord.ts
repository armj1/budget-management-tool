import User from "./User";

interface FinancialRecord {
  id: string;
  userId: string;
  user: User; // Assuming you have a User interface or type defined
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
