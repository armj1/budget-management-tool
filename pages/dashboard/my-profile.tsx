import NavbarLayout from "@/components/navbar-layout";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const prisma = new PrismaClient();

const MyProfile = (data: any) => {
  const handleSubmit = () => {};

  return (
    <NavbarLayout>
      <Head>
        <title>Mans profils</title>
        <link
          rel="icon"
          href="/circle-dollar-sign.svg"
          sizes="any"
          type="image/svg+xml"
        ></link>
      </Head>
      <div className="flex flex-row bg-slate-300 h-[calc(100vh-88px)]	p-10 justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-2xl">Svecināti, {data.firstName}!</p>
            <p>
              <br />
              Šeit Jūs varat rediģēt profila datus, kā arī izdzēst savu profilu.
              <br />
              Profila izdzēšana ir <b>neatgriezeniska</b> darbība!
            </p>
          </div>
          <Button className="mb-10" variant="destructive">
            Izdzēst profilu
          </Button>
        </div>
        <Card className="flex flex-col justify-between p-10 w-2/6">
          <form onSubmit={handleSubmit}>
            <div className="pb-2">
              <Label>Vārds</Label>
              <Input placeholder={data.firstName} />
            </div>
            <div className="pb-2">
              <Label>Uzvārds</Label>
              <Input placeholder={data.lastName} />
            </div>
            <div className="pb-2">
              <Label>E-pasts</Label>
              <Input placeholder={data.email} />
            </div>
            <div className="">
              <Label>Parole</Label>
              <Input type="password" placeholder="Parole" />
            </div>
          </form>
          <Button className="bg-black" type="submit">Rediģēt datus</Button>
        </Card>
      </div>
    </NavbarLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  return {
    props: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      newUser: userData?.newUser,
    },
  };
}

export default MyProfile;
