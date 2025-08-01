import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';
import type { CreateRoomsRequest } from './types/create-room-request';
import type { CreateRoomsResponse } from './types/create-room-response';

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateRoomsRequest) => {
      const reponse = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: CreateRoomsResponse = await reponse.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    },
  });
}
