import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const financialRecordSchema = z.object({
  id: z.string(),
  taxedIncome: z.number().positive(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const {
      id,
      taxedIncome
    } = financialRecordSchema.parse(req.body);

    try {
      const updateFinancialRecord = await prisma.financialRecord.update({
        where: { id: id },
        data: {
          taxedIncome
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
