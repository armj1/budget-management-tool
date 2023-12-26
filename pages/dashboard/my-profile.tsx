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
import { useState } from "react";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import DeleteProfileForm from "@/components/delete-profile";

const prisma = new PrismaClient();

const MyProfile = (data: any) => {
  const router = useRouter();

  const [toDelete, setToDelete] = useState(false);

  const OpenDeleteForm = () => {
    setToDelete(true);
  };
  const CloseDeleteForm = () => {
    setToDelete(false);
  };
  const [formData, setFormData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    password: "",
    confirmPassword: "",
  });

  const updateSubmit = async () => {
    try {
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (formData.password.length < 8) {
        alert("Parolei jāsatur vismaz 8 simbolus!");
      } else if (formData.password !== formData.confirmPassword) {
        alert("Ievadītās paroles nesakrīt!");
      } else if (response.ok) {
        router.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
        <div className="flex flex-col  w-2/6">
          <div className="mb-3">
            <p className="text-2xl">Svecināti, {data.firstName}!</p>
            <p>
              <br />
              Šeit Jūs varat rediģēt profila datus, kā arī izdzēst savu profilu.
              <br />
              Profila izdzēšana ir <b>neatgriezeniska</b> darbība!
            </p>
          </div>
          <Button className="mb-10 w-80" variant="destructive" onClick={OpenDeleteForm}>
            Izdzēst profilu
          </Button>
          {toDelete && (<DeleteProfileForm onClose = {CloseDeleteForm} password={data.password}/>)}
          
        </div>
        <Card className="flex flex-col justify-between p-10 w-2/6">
          <div className="pb-2">
            <Label>Vārds</Label>
            <Input
              placeholder={data.firstName}
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="pb-2">
            <Label>Uzvārds</Label>
            <Input
              placeholder={data.lastName}
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <div className="pb-2">
            <Label>E-pasts</Label>
            <Input
              placeholder={data.email}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <Separator />
          <p className="flex font-medium justify-end">
            Ievadiet esošu vai jaunu paroli
          </p>
          <div className="">
            <Label>Parole</Label>
            <Input
              type="password"
              placeholder="Parole"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Atkārtot paroli</Label>
            <Input
              type="password"
              placeholder="Atkārtot paroli"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
          <Button className="bg-black mt-6" onClick={updateSubmit}>
            Rediģēt datus
          </Button>
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
      password: userData?.password
    },
  };
}

export default MyProfile;
