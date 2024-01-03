import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { PrismaClient } from "@prisma/client";

interface DeleteFormProps {
  onClose: () => void;
  password: string;
}

const DeleteProfileForm = (props: DeleteFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
  });

  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowPasswordError(false);
        router.push("/");
      } else if (response.status === 500) {
        setShowPasswordError(true);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Card className="flex flex-col p-3">
      <Button variant="outline" size="icon" className="flex items-center text-base h-6 w-6 mb-2" onClick={props.onClose}>
        <X className="h-5 w-5" />
      </Button>
      <div className="flex flex-col pl-7 pr-7 pb-7">
        <div className="mb-3">
          <p className="font-medium mb-3">Lūdzu ievadiet paroli, lai apstiprinātu profila izdzēšanu</p>
          <Input
            type="password"
            placeholder="Parole"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {showPasswordError && <p className="flex text-red-600 justify-center text-sm mt-2">Ievadītā parole nav pareiza</p>}
        </div>
        <Button className="flex justify-center" variant="destructive" onClick={handleDelete}>
          Apstiprināt izdzēšanu
        </Button>
      </div>
    </Card>
  );
};

export default DeleteProfileForm;
