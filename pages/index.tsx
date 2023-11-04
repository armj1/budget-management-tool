import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import RegistrationCard from "@/components/registration";

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const OpenRegistration = () => {
    setIsRegistrationOpen(true);
  };

  const CloseRegistration = () => {
    setIsRegistrationOpen(false);
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
        <Input className="mb-3" type="email" placeholder="Email" />
        <Input className="mb-3" type="password" placeholder="Password" />
        <Link href="/dashboard">
          <Button className="bg-white text-black mr-3">Pieteikties</Button>
        </Link>
        <Button className="bg-white text-black" onClick={OpenRegistration}>
          Reģistrēties
        </Button>
        {isRegistrationOpen && (
          <div className="flex fixed top-0 left-0 w-full h-full items-center justify-center backdrop-blur">
            <RegistrationCard onClose={CloseRegistration} />
          </div>
        )}
      </div>
      <div className="bg-slate-950 basis-1/2 h-screen" />
    </div>
  );
}
