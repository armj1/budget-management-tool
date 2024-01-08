import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

// Atbild par lietotāja autentifikāciju / lietotāja sesiju
export const authOptions: NextAuthOptions = {
  // Pieteikšanās lapas adreses konfigurācija
  pages: {
    signIn: "/"
  },
  // Lietotāja sesijas nodrošināšanas konfigurācija
  session: {
    strategy: "jwt",
  },
  // Autentifikācijas nodrošināšanas konfigurācija 
  providers: [
    // Šajā gadījumā autentifikāciju neveic izmantojot ārējo resursu, piem., google,
    // bet gan e-pastu un paroli, kuri glabājas lokālā datu bāzē
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "E-pasts",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Parole",
        },
      },
      // Lietotāja autentifikācija
      async authorize(credentials) {
        // Pārbaude vai nav tukšu lauku
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Pārbaude vai lietotājs eksistē
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // Ievadītās un lietotāja paroles salīdzināšana ar bcrypt compare funkciju
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    // Lietotāja sesijas sasaiste ar JWT marķieri (token)
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
    // Tiek izsaukts izveidojot JWT marķieri, piešķir uid laukam lietotāja id vērtību
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
