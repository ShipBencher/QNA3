import React, { useState } from 'react';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import { Link } from 'react-router-dom';

const categories = [
  'Lore & Story',
  'Characters & Design',
  'Gameplay Mechanics',
  'Exploration & Worldbuilding',
];

export default function Categories() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const getTopQuestions = (category: string) => {
    const categoryTags = category.toLowerCase().split(' & ').map(tag => tag.trim());
    return MOCK_QUESTIONS.filter(question =>
      categoryTags.every(tag => question.tags.some(questionTag => questionTag.toLowerCase().includes(tag)))
    ).slice(0, 5);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Categories</h2>
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-md shadow-md overflow-hidden">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-100"
          >
            <span className="font-bold">{category}</span>
            <span>{openCategory === category ? '▲' : '▼'}</span>
          </button>
          {openCategory === category && (
            <div className="p-4 space-y-2">
              {getTopQuestions(category).map((question) => (
                <div key={question.id} className="py-1">
                  <Link to={`/questions/${question.id}`} className="text-[#0074cc] hover:text-[#0a95ff]">
                    {question.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
