import { useMutation, useQuery } from "@tanstack/react-query";
import { getBusinesses, getSpecificBusinesses, updateBusiness } from "../services/api";
// import { useNavigate } from "react-router-dom";

export const useBusinessesQuery = () =>
  useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
    staleTime: 60 * 60 * 1000,
  });

export const useSpecificBusinesseQuery = (name) =>
  useQuery({
    queryKey: ['businesses', name],
    queryFn: () => getSpecificBusinesses(name),
    staleTime: 60 * 60 * 1000,
  });

export const useUpdateBusinessMutation = () => {

  return useMutation({
    mutationFn: updateBusiness,
    retry: 1,
  })
}