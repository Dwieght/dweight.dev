import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
