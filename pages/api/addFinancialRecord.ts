import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

const prisma = new PrismaClient();

const financialRecordSchema = z
  .object({
    title: z.string().min(1),
    totalIncome: z
      .number()
      .positive()
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    taxedIncome: z
      .number()
      .positive()
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    housingSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    transportSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    childSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    healthSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    insuranceSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    shoppingSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    leisureSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    educationSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    recreationSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    investmentSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    petSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    foodSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
    otherSpending: z
      .number()
      .min(0)
      .refine((value) => isTwoDecimalPlaces(value), {
        message: "Should have at most two decimal places",
      }),
  })
  .refine((obj) => obj.taxedIncome <= obj.totalIncome, {
    message: "Taxed income must not be larger than total income",
  });

const isTwoDecimalPlaces = (value: number): boolean => {
  const decimalPlaces = (value.toString().split(".")[1] || "").length;
  return decimalPlaces <= 2;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const {
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
      const createFinancialRecord = await prisma.financialRecord.create({
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
          userId: session?.user.id || "",
        },
      });

      res.status(200).json({ financialRecord: createFinancialRecord });
      const updateUserStatus = await prisma.user.update({
        where: { id: session?.user.id },
        data: { newUser: false },
      });
      res.status(200).json({ userUpdate: updateUserStatus });
    } catch (error) {
      console.error("Error creating financial record:", error);
      res.status(400).json({ error: "Invalid data format" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
