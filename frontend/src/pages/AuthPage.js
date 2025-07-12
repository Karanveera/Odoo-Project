import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(endpoint, payload);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: '#0d1117' }}
    >
      <div className="p-4 rounded shadow" style={{ maxWidth: '420px', width: '100%', backgroundColor: '#161b22' }}>
        <h3 className="text-center text-success mb-3">
          {isLogin ? '🔐 Login to StackIt' : '📝 Sign Up for StackIt'}
        </h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>
          {isLogin ? 'Access your questions and answers' : 'Join the community and ask questions'}
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-light">Name</label>
              <input
                type="text"
                name="name"
                className="form-control bg-dark text-light border-secondary"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              name="email"
              className="form-control bg-dark text-light border-secondary"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              name="password"
              className="form-control bg-dark text-light border-secondary"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="btn btn-link text-info p-0 ms-1"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setForm({ name: '', email: '', password: '' });
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
