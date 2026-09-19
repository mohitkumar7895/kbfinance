import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { ensureDefaultAdmin } from "@/lib/auth-db";

if (!process.env.NEXTAUTH_URL && process.env.VERCEL_URL) {
  process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
}

const authSecret =
  process.env.NEXTAUTH_SECRET || "default_secret_for_development_only";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: false,
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await ensureDefaultAdmin();

        const [rows] = await pool.execute<RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        if (rows.length === 0) {
          throw new Error("User not found");
        }

        const user = rows[0];
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: authSecret,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: cookieOptions,
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: cookieOptions,
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: cookieOptions,
    },
  },
};
