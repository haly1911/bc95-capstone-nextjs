import type { AuthMode } from "@/types/auth";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface OverlayPanelProps {
  authMode: AuthMode;
  onAuthModeChange: (mode: AuthMode) => void;
}

const OverlayPanel = ({ authMode, onAuthModeChange }: OverlayPanelProps) => {
  return (
    <aside
      className={`absolute top-0 w-1/2 h-full bg-linear-120 from-primary to-foreground text-background p-16 hidden lg:flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out z-10 shadow-2xl ${authMode === "signup" ? "left-0 translate-x-0" : "left-1/2 translate-x-0"}`}
    >
      <Image loading="eager" src="/authLogo.png" alt="authlogo" width={320} height={320} className="mx-auto" />
      <div className="transition-opacity duration-500 max-w-md">
        <h2 className="text-4xl font-bold">
          {authMode === "signin" ? (
            <>
              New to Skill<span className="text-accent">ora</span>?
            </>
          ) : (
            "Already have an account?"
          )}
        </h2>
        <p className="mt-4 text-base">
          {authMode === "signin"
            ? "Sign up to hire top freelancers or start selling your own professional services today"
            : "Sign in to manage your orders, messages, and continue growing your business"}
        </p>
        <button
          onClick={() => onAuthModeChange(authMode === "signin" ? "signup" : "signin")}
          className="mt-8 rounded-lg border border-border/50 px-10 py-3.5 text-sm font-semibold bg-foreground hover:bg-secondary hover:text-foreground transition cursor-pointer"
        >
          {authMode === "signin" ? (
            <>
              <FaArrowRight className="mr-2 text-xs inline-block" />
              Create account
            </>
          ) : (
            <>
              <FaArrowLeft className="mr-2 text-xs inline-block" />
              Back to sign in
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default OverlayPanel;
