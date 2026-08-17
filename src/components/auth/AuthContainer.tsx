"use client";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";
import { useEffect, useState } from "react";
import type { AuthMode } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const AuthContainer = () => {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  useEffect(() => {
    (setIsMounted(true), initializeAuth());
  }, [initializeAuth]);

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.replace("/");
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted || isAuthenticated) return null;

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-card`}>
      {/* Giao diện cho Mobile & Tablet */}
      <div className="w-full h-full flex flex-col justify-center items-center p-4 overflow-y-auto lg:hidden">
        <div className="w-full max-w-md">
          {authMode === "signin" ? <SignInForm /> : <SignUpForm onSwitchToSignIn={() => setAuthMode("signin")} />}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {authMode === "signin" ? (
              <p>
                New to Skillora?{" "}
                <button
                  onClick={() => setAuthMode("signup")}
                  className="text-accent font-semibold hover:underline cursor-pointer"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setAuthMode("signin")}
                  className="text-accent font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Giao diện Desktop */}
      <div className="hidden lg:grid grid-cols-2 w-full h-full relative">
        <SignInForm />
        <SignUpForm onSwitchToSignIn={() => setAuthMode("signin")} />
        <OverlayPanel authMode={authMode} onAuthModeChange={setAuthMode} />
      </div>
    </main>
  );
};

export default AuthContainer;
