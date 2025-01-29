import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function QuestionList() {
  const [questions, setQuestions] = useState([...MOCK_QUESTIONS]);
  const [sortBy, setSortBy] = useState<'votes' | 'createdAt' | 'views'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleVote = (questionId: string, voteType: 'up' | 'down') => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            votes: voteType === 'up' ? question.votes + 1 : question.votes - 1,
          };
        }
        return question;
      })
    );
  };

  const handleSort = (field: 'votes' | 'createdAt' | 'views') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    const aValue = sortBy === 'createdAt' ? a.createdAt.getTime() : a[sortBy];
    const bValue = sortBy === 'createdAt' ? b.createdAt.getTime() : b[sortBy];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="border-t border-gray-200">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => handleSort('votes')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${sortBy === 'votes' ? 'font-bold' : ''}`}
        >
          Votes
        </button>
        <button
          onClick={() => handleSort('createdAt')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${sortBy === 'createdAt' ? 'font-bold' : ''}`}
        >
          Date
        </button>
        <button
          onClick={() => handleSort('views')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${sortBy === 'views' ? 'font-bold' : ''}`}
        >
          Views
        </button>
      </div>
      {sortedQuestions.map((question) => (
        <div key={question.id} className="flex gap-4 py-4 border-b border-gray-200">
          <div className="flex flex-col items-end gap-1 text-[13px] text-gray-600 min-w-[108px]">
            <div className="text-center">
              <span className="font-medium">{question.votes}</span>
              <span className="block text-[12px]">votes</span>
            </div>
            <div className="text-center">
              <span className={`font-medium ${question.answers.length > 0 ? 'text-green-600' : ''}`}>
                {question.answers.length}
              </span>
              <span className="block text-[12px]">answers</span>
            </div>
            <div className="text-center">
              <span className="font-medium">{question.views}</span>
              <span className="block text-[12px]">views</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] text-[#0074cc] hover:text-[#0a95ff]">
              <Link to={`/questions/${question.id}`}>{question.title}</Link>
            </h2>
            <p className="mt-1 text-[13px] text-gray-600 line-clamp-2">{question.body}</p>
            
            <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap gap-1">
                {question.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="px-1.5 py-1 text-[12px] text-[#2c5877] bg-[#e1ecf4] hover:bg-[#d0e3f1] rounded-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              <div className="text-[12px] text-gray-600">
                <Link to={`/users/${question.author}`} className="text-[#0074cc] hover:text-[#0a95ff]">
                  {question.author}
                </Link>
                <span className="mx-1">asked</span>
                {formatDistanceToNow(question.createdAt)} ago
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
