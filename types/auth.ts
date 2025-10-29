import { DefaultSession } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
    } & DefaultSession["user"];
  }
}
