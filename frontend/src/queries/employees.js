import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, getEmployees, registerEmployee, updateEmployee } from "../services/api";

import { useNavigate } from 'react-router-dom';

export const useEmployeesQuery = (bulstat) =>
  useQuery({
    queryKey: ['employees',  bulstat ],
    queryFn: () => getEmployees(bulstat),
    retry: 1,
    enabled: !!bulstat 
  });

export const useEmployeeRegisterMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerEmployee,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate('/employees')
    }
  })
}

export const useEmployeeUpdateMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateEmployee,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate('/employees')
    }
  })
}

export const useEmployeeDeleteMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      navigate('/employees');
    },
  })
}


