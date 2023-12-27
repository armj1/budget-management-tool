import FinancialRecord from "./FinancialRecord";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newUser: boolean;
  financialRecord: FinancialRecord[];
}

export default User;
