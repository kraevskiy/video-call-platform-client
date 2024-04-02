"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { SignInInputs, SignInValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from '@/components/ui/separator';
import { GithubButton, GoogleButton } from '@/app/auth/_components/buttons';

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

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    console.log(data);
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
            <Input {...register("password")} placeholder="445g5" />
            <span className="mb-5 ml-4 block text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <Separator className="my-5 dark:bg-gray-900"/>
        <div className="space-y-2 mb-4">
          <GoogleButton />
          <GithubButton />
        </div>
        <div className="text-secondary text-sm">
          Don't have an account yet?{" "}
          <Link href="/auth/sign-up" className="cursor-pointer text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
