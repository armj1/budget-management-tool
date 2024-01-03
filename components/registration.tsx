import { CircleDollarSign, X, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";

interface RegistrationProps {
  onClose: () => void;
}

const RegistrationCard = (props: RegistrationProps) => {
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showUniqueEmailError, setShowUniqueEmailError] = useState(false);
  const [showPasswordLengthError, setShowPasswordLengthError] = useState(false);
  const [showPasswordMatchError, setShowPasswordMatchError] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        props.onClose();
      }

      if (formData.firstName.trim() === "") {
        setShowFirstNameError(true);
      } else {
        setShowFirstNameError(false);
      }

      if (formData.lastName.trim() === "") {
        setShowLastNameError(true);
      } else {
        setShowLastNameError(false);
      }

      if (!/^\S+@\S+\.\S{2,}$/.test(formData.email)) {
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }

      if (response.status === 400) {
        setShowUniqueEmailError(true);
      } else {
        setShowUniqueEmailError(false);
      }

      if (formData.password.length < 8) {
        setShowPasswordLengthError(true);
      } else {
        setShowPasswordLengthError(false);
      }

      if (formData.confirmPassword != formData.password) {
        setShowPasswordMatchError(true);
      } else {
        setShowPasswordMatchError(false);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Card className="flex flex-col shadow-lg rounded p-4 text-base w-1/3 h-4/5 mb-20 mt-10">
      <div className="flex flex-row justify-between">
        <Button variant="outline" size="icon" className="flex items-center text-base" onClick={props.onClose}>
          <X />
        </Button>
        <CircleDollarSign className=" w-6 h-6 mb-2 mt-1" />
        <div className="invisible">aaaaa</div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">REĢISTRĀCIJA</p>
        <p className="flex pb-5 font-bold">Ievadiet pieprasītos datus</p>
        <div className="mb-3 w-3/4">
          <Input type="text" placeholder="Vārds" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {showFirstNameError && <p className="flex text-red-600 justify-center text-sm">Vārds nevar būt tukšs</p>}
        </div>
        <div className="mb-3 w-3/4">
          <Input type="text" placeholder="Uzvārds" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {showLastNameError && <p className="flex text-red-600 justify-center text-sm">Uzvārds nevar būt tukšs</p>}
        </div>
        <div className="flex flex-col mb-3 w-3/4">
          <Input type="email" placeholder="E-pasts" name="email" value={formData.email} onChange={handleChange} required />
          {showEmailError && <p className="flex text-red-600 justify-center text-sm">Nepareizs e-pasta formāts</p>}
          {showUniqueEmailError && <p className="flex text-red-600 justify-center text-sm">E-pasts ir jau reģistrēts</p>}
        </div>
        <div className="mb-3 w-3/4">
          <Input type="password" placeholder="Parole" name="password" value={formData.password} onChange={handleChange} required />
          {showPasswordLengthError && <p className="flex text-red-600 justify-center text-sm">Parolei jābūt vismaz 8 simbolus garai</p>}
        </div>
        <div className="mb-3 w-3/4">
          <Input
            type="password"
            placeholder="Atkārtot paroli"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {showPasswordMatchError && <p className="flex text-red-600 justify-center text-sm">Ievadītās paroles nesakrīt</p>}
        </div>
        <Button className="text-base mb-6 bg-black w-1/2" onClick={onRegistration}>
          Reģistrēties
        </Button>
      </div>
    </Card>
  );
};

export default RegistrationCard;
