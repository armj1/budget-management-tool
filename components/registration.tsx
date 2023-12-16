import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";

interface RegistrationProps {
  onClose: () => void;
  setIsRegistrationOpen: (isOpen: boolean) => void;
}

const RegistrationCard = (props: RegistrationProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRegistration = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data.user);
        props.setIsRegistrationOpen(false);
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Card className="flex flex-col shadow-lg rounded p-4 text-base">
      <p className="mb-3"><b>Ievadiet pieprasītos datus</b></p>
      <Input
        className="mb-3"
        type="text"
        placeholder="Vārds"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <Input
        className="mb-3"
        type="text"
        placeholder="Uzvārds"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
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
      <Button
        className="bg-white text-black text-base mb-3 bg-green-300"
        onClick={onRegistration}
      >
        Reģistrēties
      </Button>
      <Button
        className="flex items-center bg-red-300 text-black text-base"
        onClick={props.onClose}
      >
        Atcelt
      </Button>
    </Card>
  );
};

export default RegistrationCard;
