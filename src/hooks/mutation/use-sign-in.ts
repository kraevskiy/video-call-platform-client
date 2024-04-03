import { useMutation } from "@tanstack/react-query";
import signIn from "@/actions/post/sign-in";

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: signIn,
  });
  return mutation;
};
