import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <Card className="mt-6 ml-6 border-transparent">
      <h1>
        <b>Piekļuve šai lapai ir aizliegta</b>
      </h1>
      <p>
        Lai apskatītu šo lapu, Jums ir jāveic pieteikšanās nospiežot uz <b>"Pieteikties"</b> pogu
      </p>
      <Button className="mt-3" onClick={() => signIn()}>
        Pieteikties
      </Button>
    </Card>
  );
}
