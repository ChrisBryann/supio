import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// since Firebase is not Edge compatible (for Nextjs Middleware), then we need to separate the config for NextAuth
// this config holds the primary configuration that doesn't rely on the adapter
// this config will then be used in the middleware for auth

export default {
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client useSession(), like access_token or ID
      session.user.id = token.id;

      return session;
    },
  },
  events: {
    // createUser
  },
} satisfies NextAuthConfig;
