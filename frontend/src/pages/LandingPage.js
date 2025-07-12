// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
    <h1>📘 Welcome to StackIt</h1>
    <p className="lead">Ask. Answer. Learn.</p>
    <Link to="/home" className="btn btn-primary me-2">Get Started</Link>
    <Link to="/login" className="btn btn-outline-secondary">Login</Link>
  </div>
);

export default LandingPage;
