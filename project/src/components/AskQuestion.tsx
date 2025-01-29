import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../data/mockQuestions';

export default function AskQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !body || !tags) {
      setError('Please fill in all fields.');
      return;
    }

    const newQuestion = {
      id: String(MOCK_QUESTIONS.length + 1),
      title,
      body,
      votes: 0,
      tags: tags.split(',').map(tag => tag.trim()),
      author: 'testuser',
      createdAt: new Date(),
      views: 0,
      answers: [],
    };

    MOCK_QUESTIONS.push(newQuestion);
    console.log('New question submitted:', newQuestion);
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter your question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
            <textarea
              placeholder="Enter your question body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
            <input
              type="text"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}
