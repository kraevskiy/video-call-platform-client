"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import {
  CreateMeetingInputs,
  CreateMeetingValidationSchema,
} from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export function CreateMeetingWidget() {
  const { register, handleSubmit, formState: {errors} } = useForm<CreateMeetingInputs>({
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateMeetingValidationSchema),
  });

  const onSubmit: SubmitHandler<CreateMeetingInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Create new meeting</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="mb-5">Create new meeting</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label className="mb-5" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="English lesson"
                className="text-mdh-10"
                type="text"
                maxLength={110}
                {...register("name")}
              />
              <span className="ml-4 text-xs text-red-500 mb-4 block">{errors.name?.message}</span>
              <Button type="submit" className="w-full" size="sm">
                Create new meeting
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
