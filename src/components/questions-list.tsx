import { useHighlightQuestion } from '@/http/use-highlight-question';
import { useRoomQuestions } from '@/http/use-room-questions';
import { QuestionItem } from './question-item';

interface QuestionListProps {
  roomId: string;
}

export function QuestionsList(props: QuestionListProps) {
  const { data } = useRoomQuestions(props.roomId);
  const highlightQuestionMutation = useHighlightQuestion(props.roomId);

  const handleHighlightQuestion = (questionId: string) => {
    // Get current question state to toggle
    const currentQuestion = data?.find((q) => q.id === questionId);

    highlightQuestionMutation.mutate({
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
            onHighlightQuestion={handleHighlightQuestion}
            question={question}
          />
        );
      })}
    </div>
  );
}
