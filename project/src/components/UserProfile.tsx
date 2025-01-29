import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_USERS } from '../data/mockUsers';
import { User } from '../types';
import { UserPlus, Mail } from 'lucide-react';

export default function UserProfile() {
  const { username } = useParams();
  const user: User | undefined = MOCK_USERS.find((user) => user.username === username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <div className="relative">
        <img src={user.coverImage} alt="Cover" className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 p-4">
          <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white" />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600 text-sm">@{user.username} | <a href={`mailto:${user.email}`} className="text-[#0074cc] hover:text-[#0a95ff]">{user.email}</a></p>
        <p className="text-gray-700 mt-2">{user.title}</p>
        <p className="text-gray-700 text-sm">{user.location}</p>
        
        <div className="mt-4 flex justify-between">
          <div className="flex flex-col items-center">
            <span className="font-bold">{user.posts}</span>
            <span className="text-sm text-gray-600">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{user.followers}</span>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{user.following}</span>
            <span className="text-sm text-gray-600">Following</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-700">{user.bio}</p>
        
        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-[#0a95ff] hover:bg-[#0074cc] rounded-md">
            <UserPlus className="w-4 h-4" />
            Follow
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-md">
            <Mail className="w-4 h-4" />
            Message
          </button>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-bold">Skills</h3>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {user.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
