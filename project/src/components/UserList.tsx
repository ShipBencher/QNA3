import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_USERS } from '../data/mockUsers';
import { User } from '../types';

export default function UserList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_USERS.map((user) => (
          <div key={user.username} className="bg-white rounded-md shadow-md overflow-hidden">
            <img src={user.coverImage} alt="Cover" className="w-full h-32 object-cover" />
            <div className="p-4">
              <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white -mt-10 mb-2" />
              <h3 className="text-lg font-bold">
                <Link to={`/users/${user.username}`} className="text-[#0074cc] hover:text-[#0a95ff]">
                  {user.name}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">@{user.username}</p>
              <p className="text-gray-700 text-sm mt-1">{user.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
