import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to load questions', err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#2e7d32' }}>
          📚 Explore All Questions
        </h2>
        <Link to="/ask" className="btn btn-success shadow-sm">
          ➕ Ask a Question
        </Link>
      </div>

      {questions.length > 0 ? (
        questions.map((q) => (
          <div
            className="card mb-4 shadow-sm border-0"
            style={{ backgroundColor: '#f8f9fa' }}
            key={q._id}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="mb-2 text-dark fw-semibold">
                  <Link to={`/question/${q._id}`} className="text-decoration-none text-success">
                    {q.title}
                  </Link>
                </h5>
              </div>
              <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                {q.description?.slice(0, 140)}...
              </p>

              <div className="d-flex justify-content-between align-items-center">
                <small className="text-secondary">
                  👤 {q.user?.name || 'Anonymous'}
                </small>
                <div>
                  {q.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge me-1"
                      style={{
                        backgroundColor: '#2e7d32',
                        color: 'white',
                        fontSize: '0.75rem',
                        padding: '0.4em 0.6em',
                        borderRadius: '0.3rem'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info text-center mt-5">
          No questions yet. Be the first to <Link to="/ask">ask one</Link>!
        </div>
      )}
    </div>
  );
};

export default HomePage;
