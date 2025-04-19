import { useMutation } from "@tanstack/react-query";
import { loginUser, RegisterUser, updateProfile } from "../services/api";



export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser
  });

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: RegisterUser
  })
}


export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: updateProfile
  })
}