import {
  Bot,
  Loader2,
  MessageSquare,
  MessagesSquare,
  SquareCheckBig,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { dayjs } from '@/lib/dayjs';

interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
  isQuestionAnswered?: boolean;
}

interface QuestionItemProps {
  question: Question;
  onHighlightQuestion?: (questionId: string) => void;
}

export function QuestionItem({
  question,
  onHighlightQuestion,
}: QuestionItemProps) {
  const handleHighlightQuestion = () => {
    if (onHighlightQuestion) {
      onHighlightQuestion(question.id);
    }
  };

  return (
    <Card
      className={
        question.isQuestionAnswered ? 'bg-primary/25 ring-2 ring-primary' : ''
      }
    >
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex flex-1 justify-between">
              <div>
                <p className="mb-1 font-medium text-foreground">Question</p>
                <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                  {question.question}
                </p>
              </div>
              <div className={question.isQuestionAnswered ? 'hidden' : ''}>
                <button className="cursor-pointer" type="button">
                  <MessagesSquare className="hover:-translate-y-1 size-4 text-foreground transition delay-150 duration-300 ease-in-out hover:scale-110 hover:text-foreground/50" />
                </button>
              </div>
            </div>
          </div>

          {(!!question.answer || question.isGeneratingAnswer) && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">AI response</p>
                <div className="text-muted-foreground">
                  {question.isGeneratingAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-primary text-sm italic">
                        Generating response...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <div>
              <span className="text-muted-foreground text-xs">
                {dayjs(question.createdAt).toNow()}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className={
                  question.isQuestionAnswered ? 'hidden' : 'cursor-pointer'
                }
                onClick={handleHighlightQuestion}
                type="button"
              >
                <SquareCheckBig className="hover:-translate-y-1 size-4 text-foreground transition delay-150 duration-300 ease-in-out hover:scale-110 hover:text-foreground/50" />
              </button>
              <Trash2 className="size-4 cursor-pointer text-destructive hover:text-destructive/50" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
