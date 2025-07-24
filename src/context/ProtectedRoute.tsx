"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "@/lib/jwt";
import { useAuth } from "@/context/auth-context";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { isLoggedIn, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    const token = sessionStorage.getItem("auth_token");
    if (!token || !isLoggedIn) {
      sessionStorage.removeItem("auth_token");
      router.replace("/?auth=false");
      return;
    }
    const decoded = decodeJwt(token);
    if (!decoded || (decoded.exp && Date.now() / 1000 > decoded.exp)) {
      sessionStorage.removeItem("auth_token");
      router.replace("/?auth=expired");
      return;
    }
    setChecked(true);
  }, [router, isLoggedIn, hydrated]);

  if (!hydrated || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 mx-auto animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <h2 className="text-lg font-semibold">Verifying session...</h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 