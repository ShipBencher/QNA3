export interface Question {
  id: string;
  title: string;
  body: string;
  votes: number;
  tags: string[];
  author: string;
  createdAt: Date;
  views: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  body: string;
  votes: number;
  author: string;
  createdAt: Date;
  isAccepted: boolean;
}

export interface Tag {
  name: string;
  count: number;
}

export interface User {
  username: string;
  name: string;
  email: string;
  title: string;
  location: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  skills: string[];
  profileImage: string;
  coverImage: string;
}
