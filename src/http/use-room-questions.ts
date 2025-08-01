import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      // Simulate an API call
      const response = await fetch(`${API_URL}/rooms/${roomId}/questions`);
      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
