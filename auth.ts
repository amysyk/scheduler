import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // Required for Vercel deployment
  secret: process.env.AUTH_SECRET, // Explicitly pass secret for Edge Runtime
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and email to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like email
      if (token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page (we'll handle the modal in the main page)
  },
  session: {
    strategy: "jwt", // Use JWT for sessions (no database required)
  },
});
