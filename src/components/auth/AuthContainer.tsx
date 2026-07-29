"use client";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";
import { useState } from "react";
import type { AuthMode } from "@/types/auth";

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-card`}>
      <div className="grid grid-cols-2 w-full h-full relative">
        <SignInForm />
        <SignUpForm onSwitchToSignIn={() => setAuthMode("signin")} />
        <OverlayPanel authMode={authMode} onAuthModeChange={setAuthMode} />
      </div>
    </main>
  );
};

export default AuthContainer;
