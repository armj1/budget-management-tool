import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    try {
      if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { password } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { password: true },
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (passwordMatches) {
        const deleteUser = await prisma.user.delete({
          where: {
            id: session?.user.id,
          },
        });
        res.status(200).json({ userDelete: deleteUser });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
