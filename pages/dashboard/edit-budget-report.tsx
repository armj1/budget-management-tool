import NavbarLayout from "@/components/navbar-layout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Head from "next/head";

const EditBudgetReport = () => {
  return (
    <NavbarLayout>
      <Head>
        <title>Edit budget report</title>
        <link
          rel="icon"
          href="/circle-dollar-sign.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="flex flex-col">
          <p className="text-lg pb-2">
            Pirms rediģēšanas, lūdzu, izvēlieties vajadzīgo atskaiti sarakstā
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Pieejamās budžeta atskaites</Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div></div>
      </div>
    </NavbarLayout>
  );
};

export default EditBudgetReport;
