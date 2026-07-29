"use client";

import { SignInFormData, signInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "../common/FormError";
import { authService } from "@/services/auth.service";
import { setSession } from "@/lib/session";
import { toast } from "react-toastify";

const SignInForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      const res = await authService.signIn(data);
      setSession(res);
      setUser(res.content.user);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold">Welcome back!</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to manage your gigs, orders, and messages on
          <span className="text-lg">
            Skill<span className="text-accent">ora</span>
          </span>
        </p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-medium">Email</span>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
              placeholder="you@example.com"
            />
            <FormError message={errors.email?.message} />
          </label>
          <label className="block">
            <span className="text-xs font-medium">Password</span>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
              placeholder="••••••••"
            />
            <FormError message={errors.password?.message} />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
