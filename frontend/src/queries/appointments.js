import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAppointments, addAppointment, updateAppointment } from "../services/api";

export const useAppointmentsQuery = () =>
  useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });


export const useNewAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAppointment,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });

    }
  })
}


export const useUpdateAppointmentMutation = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointment,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });

    }
  })
}