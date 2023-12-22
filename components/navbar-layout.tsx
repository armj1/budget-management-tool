import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import {
  ArrowRightLeft,
  Calculator,
  CircleDollarSign,
  ClipboardEdit,
  CreditCard,
  Home,
  Lightbulb,
  PlusCircle,
  UserCircle2,
} from "lucide-react";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <div className="flex flex-row bg-red-500 p-5 justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Izvēlne</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5">
            <DropdownMenuItem>
              <UserCircle2 className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/my-profile"}>Mans profils</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClipboardEdit className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/edit-budget-report"}>
                Rediģēt budžeta atskaiti
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/new-budget-report"}>
                Izveidot jaunu budžeta atskaiti
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Home className="mr-2 h-4 w-4" />
              <Link href={"/dashboard"}>Sākumlapa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lightbulb className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/budget-recommendations"}>
                Budžeta rekomendācijas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/loan-calculator"}>
                Kredīta kalkulators
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calculator className="mr-2 h-4 w-4" />
              <Link href={"/dashboard/tax-calculator"}>
                Nodokļu kalkulators
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              <Link href={"compare-data"}>Salīdzināt atskaites</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CircleDollarSign className="h-12 w-12" />
        <Button className="ml-3" onClick={() => signOut({ callbackUrl: "/" })}>
          Atteikties
        </Button>
      </div>
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
