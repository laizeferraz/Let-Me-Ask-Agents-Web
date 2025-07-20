import { useMarkQuestionAsAnswered } from '@/http/use-question-answered';
import { useRoomQuestions } from '@/http/use-room-questions';
import { QuestionItem } from './question-item';

interface QuestionListProps {
  roomId: string;
}

export function QuestionsList(props: QuestionListProps) {
  const { data } = useRoomQuestions(props.roomId);
  const markQuestionAsAnsweredMutation = useMarkQuestionAsAnswered(
    props.roomId
  );

  const handleMarkQuestionAsAnswered = (questionId: string) => {
    // Get current question state to toggle
    const currentQuestion = data?.find((q) => q.id === questionId);

    markQuestionAsAnsweredMutation.mutate({
      questionId,
      isQuestionAnswered: !currentQuestion?.isQuestionAnswered,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Questions & Answers
        </h2>
      </div>
      {data?.map((question) => {
        return (
          <QuestionItem
            key={question.id}
            onMarkQuestionAsAnswered={handleMarkQuestionAsAnswered}
            question={question}
          />
        );
      })}
    </div>
  );
}
