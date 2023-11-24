import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface RegistrationProps {
  onClose: () => void;
}

const RegistrationCard = (props: RegistrationProps) => {
  return (
    <Card className="flex flex-col shadow-lg rounded p-4">
      <p>Ievadiet pieprasītos datus</p>
      <Input className="mb-3" type="text" placeholder="First Name" />
      <Input className="mb-3" type="text" placeholder="Last Name" />
      <Input className="mb-3" type="email" placeholder="Email" />
      <Input className="mb-3" type="password" placeholder="Password" />
      <Button className="bg-white text-black" onClick={props.onClose}>
        Close
      </Button>
    </Card>
  );
};

export default RegistrationCard;
