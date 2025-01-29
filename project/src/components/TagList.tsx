import React from 'react';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import { Tag } from '../types';

export default function TagList() {
  const tags = MOCK_QUESTIONS.reduce((acc: { [key: string]: Tag }, question) => {
    question.tags.forEach((tag) => {
      if (acc[tag]) {
        acc[tag].count++;
      } else {
        acc[tag] = { name: tag, count: 1 };
      }
    });
    return acc;
  }, {});

  const sortedTags = Object.values(tags).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top Tags</h2>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag) => (
          <a
            key={tag.name}
            href={`/tags/${tag.name}`}
            className="px-2 py-1 text-sm text-[#2c5877] bg-[#e1ecf4] hover:bg-[#d0e3f1] rounded-md"
          >
            {tag.name} <span className="text-gray-500">({tag.count})</span>
          </a>
        ))}
      </div>
    </div>
  );
}
