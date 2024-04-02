"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpInputs, SignUpValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GithubButton, GoogleButton } from "@/app/auth/_components/buttons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Routes } from "@/../routes";
import { useSignUp } from "@/hooks/mutation/use-sign-up";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2, ShieldAlert } from 'lucide-react';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpValidationSchema),
  });
  const { mutateAsync, reset, isIdle, isPending, isSuccess } = useSignUp();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? Routes.MAIN;
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.success) {
          signIn("credentials", { email: data.email, password: data.password, callbackUrl: callbackURL });
          toast.success(res.success);
        }
        if (res.error) {
          toast.error(res.error);
          reset();
          setError(res.error);
        }
      },
    });
  };

  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full bg-sky-50 p-5 dark:bg-gray-800 sm:h-fit sm:w-fit sm:min-w-[400px] sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">Sign up</h1>
        <div className="my-3">
          <div>
            <Input
              {...register("name")}
              placeholder="Name"
              autoComplete="name"
            />
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.name?.message}
            </span>
          </div>
          <div>
            <Input {...register("email")} placeholder="Email" />
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input {...register("password")} type="password" placeholder="445g5" />
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isPending || isSuccess}>
          {isIdle && "Create account"}
          {isPending && <Loader2 className="h-6 w-6 animate-spin" />}
          {isSuccess && "Account created successfully!"}
        </Button>
        {error && (
          <div className="mt-5 w-full flex items-center justify-center gap-x-4 bg-red-500 px-3 py-2 text-center text-white">
            <ShieldAlert className="w-6 h-6"/>
            {error}
          </div>
        )}
        <Separator className="my-5 dark:bg-gray-900" />
        <div className="mb-4 space-y-2">
          <GoogleButton callbackUrl={callbackURL} />
          <GithubButton callbackUrl={callbackURL} />
        </div>
        <div className="text-secondary text-sm">
          Already have an account?{" "}
          <Link href={Routes.SIGN_IN} className="cursor-pointer text-blue-500">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
