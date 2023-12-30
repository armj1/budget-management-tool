import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

const userRegistrationSchema = z
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
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = userRegistrationSchema.parse(req.body);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json({ user: createUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
