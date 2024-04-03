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
import { useCreateMeeting } from "@/hooks/mutation/use-create-meeting";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function CreateMeetingWidget() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMeetingInputs>({
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateMeetingValidationSchema),
  });
  const { mutateAsync, reset, isIdle, isSuccess, isPending } =
    useCreateMeeting();
  const { setMeeting } = useMeeting();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateMeetingInputs> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.error);
          reset();
        }
        if (res.success && res.meeting) {
          toast.success(`Meeting ${res.meeting.name} created successfully!`);
          setMeeting(res.meeting);
          router.push(res.meeting.code);
        }
      },
      onError: (res) => {},
    });
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
                disabled={isPending || isSuccess}
                className="text-mdh-10"
                type="text"
                maxLength={110}
                {...register("name")}
              />
              <span className="mb-4 ml-4 block text-xs text-red-500">
                {errors.name?.message}
              </span>
              <Button
                type="submit"
                className="w-full"
                size="sm"
                disabled={isPending || isSuccess}
              >
                {isIdle && "Create new meeting"}
                {isPending && (
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                )}
                {isSuccess && "Redirect to your meeting!"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
