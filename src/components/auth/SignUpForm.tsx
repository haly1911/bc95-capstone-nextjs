"use client";

import { SignUpFormData, signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "../common/FormError";
import { ApiSignUpPayload } from "@/types/auth";
import { authService } from "@/services/auth.service";
import { toast } from "react-toastify";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "male",
      role: "USER",
      skill: [],
      certification: [],
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);
      const payload: ApiSignUpPayload = {
        id: 0,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        birthday: data.birthday,
        gender: data.gender === "male",
        role: data.role,
        skill: data.skill,
        certification: data.certification,
      };
      await authService.signUp(payload);
      toast.success("Đăng ký tài khoản thành công!");
      reset();
      onSwitchToSignIn();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Đăng ký thất bại. Email có thể đã tồn tại!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold">
          Join Skill<span className="text-accent">ora</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find the right freelance service or start selling your skills today
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="block col-span-2">
            <span className="text-xs font-medium">Full name</span>
            <input
              {...register("name")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
              placeholder="Jane Doe"
            />
            <FormError message={errors.name?.message} />
          </label>
          <label className="block col-span-2">
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
              placeholder="At least 8 characters"
            />
            <FormError message={errors.password?.message} />
          </label>
          <label className="block">
            <span className="text-xs font-medium">Phone number</span>
            <input
              type="tel"
              {...register("phone")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
              placeholder="0909123123"
            />
            <FormError message={errors.phone?.message} />
          </label>
          <label className="block">
            <span className="text-xs font-medium">Date of birth</span>
            <input
              type="date"
              {...register("birthday")}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
            />
            <FormError message={errors.birthday?.message} />
          </label>
          <label className="block">
            <span className="text-xs font-medium">Gender</span>
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register("gender")} type="radio" value="male" />
                <span className="text-xs">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register("gender")} type="radio" value="female" />
                <span className="text-xs">Female</span>
              </label>
            </div>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full rounded-lg bg-accent px-4 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
