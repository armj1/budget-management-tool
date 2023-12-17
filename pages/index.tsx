"use client";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RegistrationCard from "@/components/registration";
import { signIn } from "next-auth/react";
import router from "next/router";

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

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Lietotājs neeksistē! Pārbaudiet vai ievadītie dati ir pareizi!");
    }
  };

  return (
    <div className="flex flex-row">
      <div className="bg-gradient-to-b from-green-700 to-green-900 pt-6 pl-6 pr-6 basis-1/2 h-screen">
        <Head>
          <title>Front page</title>
          <link rel="icon" href="/tab_icon.ico" />
        </Head>
        <div className="text-6xl text-red-50 pb-3">
          BUDŽETA PĀRVALDES<p>RĪKS</p>
        </div>
        <Input
          className="mb-3"
          type="email"
          placeholder="E-pasts"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          className="mb-3"
          type="password"
          placeholder="Parole"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button className="bg-white text-black mr-3" onClick={onSubmit}>
          Pieteikties
        </Button>
        <Button className="bg-white text-black" onClick={OpenRegistration}>
          Reģistrēties
        </Button>
        {isRegistrationOpen && (
          <div className="flex fixed top-0 left-0 w-full h-full items-center justify-center backdrop-blur-2xl">
            <RegistrationCard
              onClose={CloseRegistration}
            />
          </div>
        )}
      </div>
      <div className="bg-slate-950 basis-1/2 h-screen" />
    </div>
  );
}
