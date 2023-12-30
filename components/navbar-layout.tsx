import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { ArrowRightLeft, Calculator, CircleDollarSign, ClipboardEdit, CreditCard, Home, Lightbulb, PlusCircle, Trash2, UserCircle2 } from "lucide-react";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
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
            <DropdownMenuItem className="text-base">
              <UserCircle2 className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/my-profile"}>Mans profils</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <ClipboardEdit className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/edit-budget-report"}>Rediģēt budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <Trash2 className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/delete-budget-report"}>Izdzēst budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <PlusCircle className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/new-budget-report"}>Izveidot jaunu budžeta atskaiti</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-base">
              <Home className="mr-2 h-5 w-5" />
              <Link href={"/dashboard"}>Sākumlapa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <Lightbulb className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/budget-recommendations"}>Budžeta rekomendācijas</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <CreditCard className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/loan-calculator"}>Kredīta kalkulators</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              <Calculator className="mr-2 h-5 w-5" />
              <Link href={"/dashboard/tax-calculator"}>Nodokļu kalkulators</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
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
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
