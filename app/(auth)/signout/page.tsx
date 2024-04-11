"use client";
import { useAuth } from "@/store/AuthContext/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const authCtx = useAuth();
  const router = useRouter();
  useEffect(() => {
    authCtx.logOut().then(() => router.replace('/'));
  }, []);

  return <></>;
}
