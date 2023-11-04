import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface RegistrationProps {
  onClose: () => void;
}

const RegistrationCard = (props: RegistrationProps) => {
  return (
    <Card className="flex flex-col shadow-lg rounded p-4">
      <p>hello world!</p>
      <Button className="bg-white text-black" onClick={props.onClose}>
        Close
      </Button>
    </Card>
  );
};

export default RegistrationCard;
