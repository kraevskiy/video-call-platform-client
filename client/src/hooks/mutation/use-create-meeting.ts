import { useMutation } from "@tanstack/react-query";
import createMeeting from "@/actions/post/create-meeting";

export const useCreateMeeting = () => {
  const mutation = useMutation({ mutationFn: createMeeting });
  return mutation;
};
