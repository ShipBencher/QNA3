import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import RightSidebar from './components/RightSidebar';
import UserProfile from './components/UserProfile';
import TagList from './components/TagList';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UserList from './components/UserList';
import AskQuestion from './components/AskQuestion';
import Categories from './components/Categories';
import TagDetail from './components/TagDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <Sidebar />
            
            <main className="flex-1 min-w-0">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Top Questions</h1>
                        <Link to="/ask" className="px-4 py-2 text-sm text-white bg-[#0a95ff] hover:bg-[#0074cc] rounded-md">
                          Ask Question
                        </Link>
                      </div>
                      
                      <QuestionList />
                    </>
                  }
                />
                <Route path="/questions/:id" element={<QuestionDetail />} />
                <Route path="/users/:username" element={<UserProfile />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/tags" element={<TagList />} />
                 <Route path="/tags/:tag" element={<TagDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/ask" element={<AskQuestion />} />
                <Route path="/questions" element={<QuestionList />} />
                <Route path="/categories" element={<Categories />} />
              </Routes>
            </main>

            <RightSidebar />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
