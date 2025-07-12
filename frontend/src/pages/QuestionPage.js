import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editTags, setEditTags] = useState('');

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`/questions/${id}`);
      setQuestion(res.data);
      setEditTitle(res.data.title);
      setEditDesc(res.data.description);
      setEditTags(res.data.tags?.join(', ') || '');
    } catch (err) {
      console.error('Error fetching question');
    }
  };

  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`/answers/${id}`);
      setAnswers(res.data);
    } catch (err) {
      console.error('Error fetching answers');
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/answers/${id}`, { content: newAnswer });
      setNewAnswer('');
      fetchAnswers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit answer');
    }
  };

  const vote = async (type, answerId) => {
    try {
      await axios.post(`/votes/${answerId}`, { value: type });
      fetchAnswers();
    } catch (err) {
      alert('Vote failed');
    }
  };

  const toggleBookmark = async (questionId) => {
    try {
      await axios.post(`/bookmarks/${questionId}`);
      setBookmarked(!bookmarked);
    } catch (err) {
      alert('Bookmark failed');
    }
  };

  const fetchAIAnswer = async () => {
    setLoadingAI(true);
    try {
      const res = await axios.post('/ai/suggest', {
        question: question.title + '\n' + question.description,
      });
      console.log('✅ AI API response:', res.data);
      setAiAnswer(res.data?.answer || res.data?.choices?.[0]?.message?.content || 'No answer from AI');
    } catch (err) {
      console.error('❌ AI error:', err.response?.data || err.message);
      setAiAnswer('AI could not generate an answer.');
    }
    setLoadingAI(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await axios.delete(`/questions/${id}`);
      alert('Question deleted');
      navigate('/');
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put(`/questions/${id}`, {
        title: editTitle,
        description: editDesc,
        tags: editTags.split(',').map(tag => tag.trim())
      });
      setQuestion(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div>
      {question ? (
        <>
          <div className="mb-4 position-relative">
            {!isEditing ? (
              <>
                <h3>{question.title}</h3>
                <button
                  className="btn btn-outline-secondary btn-sm position-absolute end-0 top-0"
                  onClick={() => toggleBookmark(question._id)}
                >
                  🔖 {bookmarked ? 'Unsave' : 'Save'}
                </button>
                {question.image && (
                  <div className="my-3">
                    <img src={question.image} alt="uploaded" className="img-fluid rounded" />
                  </div>
                )}
                <p>{question.description}</p>
                <div className="mb-2">
                  {question.tags?.map((tag, idx) => (
                    <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                </div>
                <small className="text-muted">Asked by: {question.user?.name || 'Anonymous'}</small>
                <div className="mt-3">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => setIsEditing(true)}>✏ Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={handleDelete}>🗑 Delete</button>
                </div>
              </>
            ) : (
              <div className="card card-body">
                <h5>Edit Question</h5>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="form-control mb-2" />
                <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="form-control mb-2" rows="4" />
                <input type="text" value={editTags} onChange={(e) => setEditTags(e.target.value)} className="form-control mb-2" placeholder="Comma separated tags" />
                <button className="btn btn-sm btn-success me-2" onClick={handleEdit}>💾 Save</button>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>❌ Cancel</button>
              </div>
            )}

            <div className="mt-3">
              <button className="btn btn-outline-info btn-sm" onClick={fetchAIAnswer}>
                🤖 Get AI Suggested Answer
              </button>
              {loadingAI && <p className="text-muted mt-2">AI is thinking...</p>}
              {aiAnswer && (
                <div className="alert alert-secondary mt-3">
                  <strong>AI Suggestion:</strong><br />
                  {aiAnswer}
                </div>
              )}
            </div>
          </div>

          <hr />

          <h5>Answers</h5>
          {answers.length > 0 ? (
            answers.map((ans) => (
              <div key={ans._id} className="card mb-3">
                <div className="card-body">
                  <p>{ans.content}</p>
                  <small className="text-muted">By {ans.user?.name || 'Anonymous'} | Votes: {ans.votes}</small>
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => vote('up', ans._id)}>⬆ Upvote</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => vote('down', ans._id)}>⬇ Downvote</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No answers yet. Be the first to answer!</p>
          )}

          <form onSubmit={handleAnswerSubmit}>
            <div className="mb-3">
              <label>Your Answer</label>
              <textarea
                className="form-control"
                rows="4"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                required
              ></textarea>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Submit Answer</button>
          </form>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default QuestionPage;
