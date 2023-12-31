import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { ArrowRightLeft, Calculator, CircleDollarSign, ClipboardEdit, CreditCard, Home, Lightbulb, PlusCircle, Trash2, UserCircle2 } from "lucide-react";

interface NavbarProps {
  children: React.ReactNode
  currentPage: string
}

const NavbarLayout = (props: NavbarProps) => {
  return (
    <>
      <div className="flex flex-row bg-red-500 p-5 justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-base" variant="outline">
              Izvēlne
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5">
            <DropdownMenuItem className={`text-base ${props.currentPage === 'myProfile' ? 'font-bold' : ''}`}>
              <UserCircle2 className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/my-profile"}>Mans profils</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'editBudgetReport' ? 'font-bold' : ''}`}>
              <ClipboardEdit className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/edit-budget-report"}>Rediģēt budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'deleteBudgetReport' ? 'font-bold' : ''}`}>
              <Trash2 className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/delete-budget-report"}>Izdzēst budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'newBudgetReport' ? 'font-bold' : ''}`}>
              <PlusCircle className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/new-budget-report"}>Izveidot jaunu budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={`text-base ${props.currentPage === 'dashboard' ? 'font-bold' : ''}`}>
              <Home className="mr-2 h-5 w-5" />
              <Link href={"/dashboard"}>Sākumlapa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'budgetRecommendations' ? 'font-bold' : ''}`}>
              <Lightbulb className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/budget-recommendations"}>Budžeta rekomendācijas</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'taxCalculator' ? 'font-bold' : ''}`}>
              <Calculator className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/tax-calculator"}>Nodokļu kalkulators</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={`text-base ${props.currentPage === 'compareData' ? 'font-bold' : ''}`}>
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/compare-data"}>Salīdzināt atskaites</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CircleDollarSign className="h-12 w-12" />
        <Button className="ml-3 text-base bg-black" onClick={() => signOut({ callbackUrl: "/" })}>
          Atteikties
        </Button>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default NavbarLayout;
