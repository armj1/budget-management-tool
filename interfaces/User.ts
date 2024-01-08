import FinancialRecord from "./FinancialRecord";

// Datu tipu definēšana lietotāja datiem (ne datu bāzē)
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newUser: boolean;
  financialRecord: FinancialRecord[]; // Atsauce uz budžeta atskaišu datu shēmu
}

export default User;
