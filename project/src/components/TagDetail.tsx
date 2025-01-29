import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import QuestionList from './QuestionList';

export default function TagDetail() {
  const { tag } = useParams();

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const filteredQuestions = MOCK_QUESTIONS.filter(question =>
    question.tags.some(questionTag => questionTag.toLowerCase() === tag.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Questions tagged with "{tag}"</h2>
      {filteredQuestions.length > 0 ? (
        <QuestionList questions={filteredQuestions} />
      ) : (
        <p>No questions found with this tag.</p>
      )}
    </div>
  );
}
