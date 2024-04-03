"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { JoinMeetingInputs, JoinMeetingValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export function JoinMeetingWidget({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<JoinMeetingInputs>({
    mode: "onBlur",
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(JoinMeetingValidationSchema),
  });
  const watchCode = watch("code");
  const router = useRouter();

  const onSubmit: SubmitHandler<JoinMeetingInputs> = async (data) => {
    router.push(data.code);
  };
  const onError: SubmitErrorHandler<JoinMeetingInputs> = async (data) => {
    toast.error(data.code?.message || "");
  };

  return (
    <div className={cn(className)}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid items-center gap-3 sm:grid-cols-[3fr,1fr]"
      >
        <Input
          className="h-11 text-md sm:rounded-2xl"
          placeholder="Enter code"
          maxLength={18}
          {...register("code")}
        />
        <Button
          className="sm:rounded-2xl"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Join"
          )}
        </Button>
      </form>
      <div className="ml-2 mt-1 text-sm">{watchCode.length}/18</div>
    </div>
  );
}
