import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

const prisma = new PrismaClient();

const financialRecordSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  totalIncome: z.number().positive(),
  taxedIncome: z.number().positive(),
  housingSpending: z.number().min(0),
  transportSpending: z.number().min(0),
  childSpending: z.number().min(0),
  healthSpending: z.number().min(0),
  insuranceSpending: z.number().min(0),
  shoppingSpending: z.number().min(0),
  leisureSpending: z.number().min(0),
  educationSpending: z.number().min(0),
  recreationSpending: z.number().min(0),
  investmentSpending: z.number().min(0),
  petSpending: z.number().min(0),
  foodSpending: z.number().min(0),
  otherSpending: z.number().min(0),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "PUT") {
    const {
      id,
      title,
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
    } = financialRecordSchema.parse(req.body);

    try {
      const updateFinancialRecord = await prisma.financialRecord.update({
        where: { id: id },
        data: {
          title,
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
        },
      });

      res.status(200).json({ financialRecord: updateFinancialRecord });
    } catch (error) {
      console.error("Error updating financial record:", error);
      res.status(400).json({ error: "Invalid data format" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
