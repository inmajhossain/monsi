import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();

        const email = typeof credentials.email === 'string' ? credentials.email.toLowerCase().trim() : '';
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const password = typeof credentials.password === 'string' ? credentials.password : '';
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.status = user.status;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session?.user) {
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "monsi-engineering-super-secret-jwt-key-2026",
});

export const { GET, POST } = handlers;
