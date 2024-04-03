"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { SignInInputs, SignInValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GithubButton, GoogleButton } from "@/app/auth/_components/buttons";
import { useSearchParams } from "next/navigation";
import { Routes } from "@/../routes";
import { useSignIn } from "@/hooks/mutation/use-sign-in";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuShieldAlert } from "react-icons/lu";

import toast from "react-hot-toast";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInValidationSchema),
  });
  const {
    mutateAsync,
    reset: resetMutation,
    isSuccess,
    isPending,
    isIdle,
  } = useSignIn();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? Routes.MAIN;

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    await mutateAsync(
      { data, callbackURL },
      {
        onSuccess: (res) => {
          if (res?.error) {
            reset();
            resetMutation();
            setError(res.error);
          } else {
            toast.success("Welcome");
          }
        },
      },
    );
  };

  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full bg-sky-50 p-5 dark:bg-gray-800 sm:h-fit sm:w-fit sm:min-w-[400px] sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">Sign in</h1>
        <div className="my-3">
          <div>
            <Input {...register("email")} placeholder="email" />
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input {...register("password")} placeholder="*****" type="password"/>
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isSuccess}
        >
          {isIdle && "Sign in"}
          {isPending && <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />}
          {isSuccess && "Welcome!"}
        </Button>
        {error && (
          <div className="mt-5 flex w-full items-center justify-center gap-x-4 bg-red-500 px-3 py-2 text-center text-white">
            <LuShieldAlert className="h-6 w-6" />
            {error}
          </div>
        )}
        <Separator className="my-5 dark:bg-gray-900" />
        <div className="mb-4 space-y-2">
          <GoogleButton callbackUrl={callbackURL} />
          <GithubButton callbackUrl={callbackURL} />
        </div>
        <div className="text-sm text-secondary">
          {"Don't have an account yet? "}
          <Link href={Routes.SIGN_UP} className="cursor-pointer text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
