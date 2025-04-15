import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/api";



export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser
  });
