import React, { createContext, useContext, useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";

// User data type interface
interface UserType {
  email: string | null;
  token_id: string | null;
}

interface AuthContextState {
  user: UserType;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextState>({
  user: { email: null, token_id: null },
  logIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logOut: () => {
    return signOut(auth);
  },
});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, token_id: null });
  const [loading, setLoading] = useState<Boolean>(true);

  const router = useRouter();

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const token_id = await user.getIdToken();
          setCookie("user", token_id, {
            maxAge: 3600, // one hour
          });
          setUser({
            email: user.email,
            token_id,
          });
        } catch (err) {
          console.log("Error getting ID token: ", err);

          router.push("/signin");
        } finally {
          setLoading(false);
        }
      } else {
        hasCookie("user") && deleteCookie("user");
        setUser({ email: null, token_id: null });
        
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sign up the user
  // const signUp = (email: string, password: string) => {
  //     return createUserWithEmailAndPassword(auth, email, password);
  // };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, token_id: null });
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
