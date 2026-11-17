"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Customer } from "@/types";
import { API_URL, apiFetch } from "@/lib/seminar-api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: Customer | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// The session cookie is httpOnly and (in dev) lives on the ngrok domain, so the
// signed-in state is resolved in the browser via /api/customers/me. This is for
// display only: the backend re-checks access on every protected request.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<Customer | null>(null);

  const refresh = useCallback(async () => {
    if (!API_URL) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }
    try {
      const res = await apiFetch("/api/customers/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : null;
      // Anything without a `user` object (incl. 404 for admin-panel sessions)
      // counts as signed out.
      if (data?.user) {
        setUser(data.user);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  // Signed-out state is applied before the request, so anything gated on it
  // (e.g. a playing seminar) is blocked immediately. Never throws.
  const logout = useCallback(async () => {
    setUser(null);
    setStatus("unauthenticated");
    try {
      await apiFetch("/api/customers/logout", { method: "POST" });
    } catch {
      // Already signed out locally.
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ status, user, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
