import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore_admin } from "./firebase-admin.config";
import authConfig from "./auth.config";

export const authOptions: NextAuthConfig = {
  // Configure one or more authentication providers
  adapter: FirestoreAdapter(firestore_admin),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    // only allow users that are already present in db
    // make sure to sign up users that are whitelisted to this app
    async signIn({ user }) {
      const user_in_db = await firestore_admin.doc(`/users/${user.id}`).get();

      return user_in_db.exists;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
