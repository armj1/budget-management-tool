import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const deleteReport = await prisma.financialRecord.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ reportDelete: deleteReport });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
  }
}
