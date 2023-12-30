"use client";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RegistrationCard from "@/components/registration";
import { signIn } from "next-auth/react";
import router from "next/router";
import { Card } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const OpenRegistration = () => {
    setIsRegistrationOpen(true);
  };
  const CloseRegistration = () => {
    setIsRegistrationOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Pieteikšanās neizdevās! Pārbaudiet vai ievadītie dati ir pareizi!");
    }
  };

  return (
    <div className="flex flex-row justify-center bg-gradient-to-b from-green-700 to-green-900 p-6 h-screen w-full">
      <Head>
        <title>Front page</title>
        <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
      </Head>
      <Card className="flex flex-col items-center mt-10 mb-20 p-6 w-1/3">
        <CircleDollarSign className="w-6 h-6 mb-2" />
        <p className="text-3xl mb-10">BUDŽETA PĀRVALDES RĪKS</p>
        <Input className="mb-3" type="email" placeholder="E-pasts" name="email" value={formData.email} onChange={handleChange} />
        <Input className="mb-3" type="password" placeholder="Parole" name="password" value={formData.password} onChange={handleChange} />
        <Button className="bg-black w-1/2" onClick={handleSubmit}>
          Pieteikties
        </Button>
        <p className="mt-20">Vai Jūs vēlaties reģistrēties?</p>
        <Button variant="link" onClick={OpenRegistration}>
          Reģistrēties
        </Button>
        {isRegistrationOpen && (
          <div className="flex fixed top-0 left-0 w-full h-full items-center justify-center ">
            <RegistrationCard onClose={CloseRegistration} />
          </div>
        )}
      </Card>
    </div>
  );
}
