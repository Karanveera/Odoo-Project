import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AskPage from './pages/AskPage';
import QuestionPage from './pages/QuestionPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SavedPage from './pages/SavedPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskPage />
              </ProtectedRoute>
            }
          />
          <Route path="/question/:id" element={<QuestionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
