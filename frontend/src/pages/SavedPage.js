import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const SavedPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get('/bookmarks');
      setBookmarks(res.data);
    } catch (err) {
      console.error('Failed to load bookmarks');
      setError('Could not load saved questions. Please try again.');
    }
  };

  const handleUnsave = async (questionId) => {
    try {
      await axios.post(`/bookmarks/${questionId}`); // toggle API used to unsave as well
      setBookmarks(prev => prev.filter(q => q._id !== questionId)); // remove from UI
    } catch (err) {
      alert('Failed to unsave question');
    }
  };

  return (
    <div style={{ background: '#f2fdf6', minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <h2 className="mb-4" style={{ color: '#14532d', fontWeight: 'bold' }}>🔖 Saved Questions</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {bookmarks.length > 0 ? (
          bookmarks.map((q) => (
            <div key={q._id} className="card shadow-sm border-0 mb-3">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <h5>
                    <Link to={`/question/${q._id}`} style={{ textDecoration: 'none', color: '#14532d' }}>
                      {q.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-1">{q.description?.slice(0, 100)}...</p>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleUnsave(q._id)}
                  title="Unsave"
                >
                  ❌ Unsave
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted">📭 You have not saved any questions yet.</div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
