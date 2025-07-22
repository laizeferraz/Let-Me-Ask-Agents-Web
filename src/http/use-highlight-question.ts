import { useState } from 'react';

export function useHighlightQuestions() {
  const [highlightedQuestions, setHighlightedQuestions] = useState<Set<string>>(
    new Set()
  );

  const toggleHighlight = (questionId: string) => {
    setHighlightedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const isHighlighted = (questionId: string) =>
    highlightedQuestions.has(questionId);

  return {
    toggleHighlight,
    isHighlighted,
  };
}
