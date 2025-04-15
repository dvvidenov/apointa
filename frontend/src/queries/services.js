import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServices, addService, getService, updateService, deleteService } from "../services/api";
import { useNavigate } from 'react-router-dom';


export const useServicesQuery = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

export const useGetServiceQuery = (id) =>
  useQuery({
    queryKey: ['services', { id }],
    queryFn: () => getService(id)
  });

export const useServiceMutation = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addService,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      navigate('/services');
    },
  });
}

export const useUpdateServiceMutaion = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateService,
    retry: 1,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', { id: variables.id }] });
      navigate('/services');
    },
  });
}

export const useDeleteMutaion = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      navigate('/services');
    },
  })
}