import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export default async function handler(  
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === "POST") {
        const { firstName, lastName, email, password } = req.body;
    
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
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
