import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

const userUpdateSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "PUT") {
    const { firstName, lastName, email, password } = userUpdateSchema.parse(req.body);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const updateUser = await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({ user: updateUser });
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target === "user_email_key") {
        res.status(400).json({ message: "Email is already in use." });
      } else {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
