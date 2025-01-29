import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function QuestionList() {
  const [questions, setQuestions] = useState([...MOCK_QUESTIONS]);
  const [sortBy, setSortBy] = useState<'votes' | 'createdAt' | 'views'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'interesting' | 'featured' | 'hot' | 'week' | 'month'>('interesting');

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

  const handleFilter = (filterType: 'interesting' | 'featured' | 'hot' | 'week' | 'month') => {
    setFilter(filterType);
  };

  const filteredQuestions = [...questions].sort((a, b) => {
    const aValue = sortBy === 'createdAt' ? a.createdAt.getTime() : a[sortBy];
    const bValue = sortBy === 'createdAt' ? b.createdAt.getTime() : b[sortBy];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  }).filter(question => {
    if (filter === 'interesting') {
      return true;
    }
    if (filter === 'featured') {
      return question.votes > 100;
    }
    if (filter === 'hot') {
      return question.views > 500;
    }
    if (filter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return question.createdAt > weekAgo;
    }
    if (filter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return question.createdAt > monthAgo;
    }
    return true;
  });

  return (
    <div className="border-t border-gray-200">
      <div className="flex justify-start gap-4 mb-4">
        <button
          onClick={() => handleFilter('interesting')}
          className={`px-3 py-1.5 text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-md ${filter === 'interesting' ? 'font-bold' : ''}`}
        >
          Interesting
        </button>
        <button
          onClick={() => handleFilter('featured')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${filter === 'featured' ? 'font-bold' : ''}`}
        >
          Featured
        </button>
        <button
          onClick={() => handleFilter('hot')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${filter === 'hot' ? 'font-bold' : ''}`}
        >
          Hot
        </button>
        <button
          onClick={() => handleFilter('week')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${filter === 'week' ? 'font-bold' : ''}`}
        >
          Week
        </button>
        <button
          onClick={() => handleFilter('month')}
          className={`px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md ${filter === 'month' ? 'font-bold' : ''}`}
        >
          Month
        </button>
      </div>
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
      {filteredQuestions.map((question) => (
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
