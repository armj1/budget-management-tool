import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

// Shēma reģistrācijas datu validācijai
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

// Lietotāja reģistrācijas funkcija
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Tiek veikta ievadīto datu salīdzināšana ar shēmu
    const { firstName, lastName, email, password } = userRegistrationSchema.parse(req.body);

    try {
      // Paroles šifrēšana un lietotāja izveides vaicājums
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
    } catch (error:any) {
      // Tiek izmantots, lai varētu izvadīt paziņojumu par jau reģistrētu e-pastu
      if (error.code === "P2002" && error.meta?.target === "user_email_key") {
        res.status(400).json({ message: "Email is already in use." });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
