import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';
import type { MarkQuestionAsAnsweredRequest } from './types/question-answered-request';
import type { MarkQuestionAsAnsweredResponse } from './types/question-answered-response';

export function useMarkQuestionAsAnswered(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MarkQuestionAsAnsweredRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions/${data.questionId}/highlight`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isQuestionAnswered: data.isQuestionAnswered }),
        }
      );

      const result: MarkQuestionAsAnsweredResponse = await response.json();
      return result;
    },

    // Executed when the API call happens (optimistic update)
    onMutate({ questionId, isQuestionAnswered }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-questions',
        roomId,
      ]);

      const questionsArray = questions ?? [];

      // Store original state for rollback
      const originalQuestion = questionsArray.find((q) => q.id === questionId);

      // Apply optimistic update
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        questionsArray.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              isQuestionAnswered,
            };
          }
          return question;
        })
      );

      return { originalQuestion, questions: questionsArray };
    },

    onSuccess(data, _variables, _context) {
      // Confirm the update with server response
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === data.questionId) {
              return {
                ...question,
                isQuestionAnswered: data.isQuestionAnswered,
              };
            }
            return question;
          });
        }
      );
    },

    onError(_error, _variables, context) {
      // Rollback optimistic update on error
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
  });
}
