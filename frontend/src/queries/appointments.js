import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/api";

export const useAppointmentsQuery = () =>
  useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments
  });
