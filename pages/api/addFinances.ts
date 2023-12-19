import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const {
      totalIncome,
      taxedIncome,
      housingSpending,
      transportSpending,
      childSpending,
      healthSpending,
      insuranceSpending,
      shoppingSpending,
      leisureSpending,
      educationSpending,
      recreationSpending,
      investmentSpending,
      petSpending,
      foodSpending,
      otherSpending,
    } = req.body;

    try {
      const createFinancialRecord = await prisma.financialRecord.create({
        data: {
          totalIncome,
          taxedIncome,
          housingSpending,
          transportSpending,
          childSpending,
          healthSpending,
          insuranceSpending,
          shoppingSpending,
          leisureSpending,
          educationSpending,
          recreationSpending,
          investmentSpending,
          petSpending,
          foodSpending,
          otherSpending,
          user: {
            create: {
              userId: session?.user.id || "",
            },
          },
        },
      });

      res.status(200).json({ financialRecord: createFinancialRecord });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
