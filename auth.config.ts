import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";

// we are using this file because prisma doesn't work on edge but middleware does
export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;

          const isCorrect: boolean = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (!isCorrect) {
            throw new Error("Invalid credentials!");
          }

          if (isCorrect) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
