import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import prisma from "~/config/Prisma";
import { compare } from "bcrypt";

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
    }

    interface Session {
        user: {
            id: string;
            username: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        username: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                // Find user in database
                const user = await prisma.users.findFirst({
                    where: {
                        username: credentials.username,
                    },
                });

                if (!user) {
                    throw new Error("No user found");
                }

                // Compare passwords
                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    username: user.username,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                },
            };
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);
