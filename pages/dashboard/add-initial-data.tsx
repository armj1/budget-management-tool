import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import Head from "next/head";

const AddInitialData = (data: any) => {
  return (
    <div className="bg-green-200 h-screen">
      <Head>
        <title>Add initial data</title>
        <link rel="icon" href="/tab_icon.ico" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between w-full pr-5">
          <div className="invisible">cccccccccccccccc</div>
          <div className="flex flex-col items-center">
            <h1 className="mt-5 text-xl">
              Paldies par reģistrāciju, <b>{data.firstName}</b>!
            </h1>
            <p className="text-l mb-5">
              Pirms rīka izmantošanas, lūdzu, ievadiet zemāk prasīto informāciju
            </p>
          </div>
          <Button className="flex mt-7 ml-50" onClick={() => signOut({ callbackUrl: "/" })}>Atteikties</Button>
        </div>
        <Card className="flex flex-col p-10">
          <div className="flex flex-row pb-5">
            <div className="pr-10">
              <p className="font-medium mb-2">Ienākumi</p>
              <Input className="mb-2" placeholder="Bruto alga" />
              <Input className="mb-6" placeholder="Neto alga" />
              <p className="font-medium mb-2">Izdevumi</p>
              <Input className="mb-2" placeholder="Mājoklis" />
              <Input className="mb-2" placeholder="Transports" />
              <Input className="mb-2" placeholder="Pārtika" />
              <Input
                className="mb-2 mr-3"
                placeholder="Veselība / skaistumkopšana"
              />
              <Input className="mb-2" placeholder="Bērni" />
            </div>
            <div>
              <Input
                className="mt-8 mb-2"
                placeholder="Iepirkšanās / pakalpojumi"
              />
              <Input className="mb-2" placeholder="Brīvais laiks / izklaide" />
              <Input className="mb-2" placeholder="Izglītība" />
              <Input className="mb-2" placeholder="Atpūta" />
              <Input className="mb-2" placeholder="Apdrošināšana" />
              <Input className="mb-2" placeholder="Ieguldījumi / uzkrājumi" />
              <Input className="mb-2" placeholder="Mājdzīvnieki" />
              <Input className="mb-2" placeholder="Citi izdevumi" />
            </div>
          </div>

          <Button>Iesniegt</Button>
        </Card>
      </div>
    </div>
  );
};
export default AddInitialData;
