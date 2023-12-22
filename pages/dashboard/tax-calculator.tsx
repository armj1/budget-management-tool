import NavbarLayout from "@/components/navbar-layout";
import Head from "next/head";

const TaxCalculator = () => {
  return (
    <NavbarLayout>
      <div className="flex flex-row">
        <Head>
          <title>Tax calculator</title>
          <link rel="icon" href="/circle-dollar-sign.svg" sizes="any" type="image/svg+xml"></link>
        </Head>
      </div>
    </NavbarLayout>
  );
};

export default TaxCalculator;
