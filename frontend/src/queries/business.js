import { useQuery } from "@tanstack/react-query";
import { getBusinesses, getSpecificBusinesses } from "../services/api";

export const useBusinessesQuery = () =>
  useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
    staleTime: 60 * 60 * 1000,
  });

export const useSpecificBusinesseQuery = (name) =>
  useQuery({
    queryKey: ['businesses',name],
    queryFn: () => getSpecificBusinesses(name),
    staleTime: 60 * 60 * 1000,
  });