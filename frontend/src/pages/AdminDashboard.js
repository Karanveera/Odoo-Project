import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { isLoggedIn } from '../utils/auth';

const AdminPage = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalQuestions: 0 });
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchStats();
    fetchQuestions();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/admin/stats');
      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Stats load error');
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('/questions');
      setQuestions(res.data);
    } catch (err) {
      console.error('Error loading questions');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error loading users');
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await axios.delete(`/admin/question/${id}`);
      fetchQuestions();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const colors = {
    bg: '#f2f7f5',       // Light mint gray
    card: '#ffffff',     // White
    title: '#2e7d32',    // Dark green
    badge: '#e8f5e9',    // Light green for highlights
  };

  if (error)
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <div className="p-4 rounded shadow" style={{ backgroundColor: colors.card }}>
          <h3 className="mb-4 fw-bold text-center" style={{ color: colors.title }}>🔧 Admin Dashboard</h3>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card p-3" style={{ backgroundColor: colors.badge }}>
                <h5>Total Users: {stats.totalUsers}</h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3" style={{ backgroundColor: colors.badge }}>
                <h5>Total Questions: {stats.totalQuestions}</h5>
              </div>
            </div>
          </div>

          <h5 className="fw-bold mt-4 mb-2">📋 All Questions</h5>
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q._id}>
                  <td>{q.title}</td>
                  <td>{q.user?.name || 'Anonymous'}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteQuestion(q._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="fw-bold mt-5 mb-2">👥 All Users</h5>
          <table className="table table-striped">
            <thead className="table-dark text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;