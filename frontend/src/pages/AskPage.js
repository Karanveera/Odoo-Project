import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/questions', {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        image: imageURL,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post question');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload/image', formData);
      setImageURL(res.data.url);
    } catch (err) {
      alert('Upload failed');
    }
  };

  const colors = {
    container: '#f2f7f5',   // light mint
    card: '#ffffff',        // pure white
    heading: '#2e7d32',     // dark green
    inputBG: '#e8f5e9',     // soft green
  };

  return (
    <div style={{ backgroundColor: colors.container, minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <div className="col-md-8 offset-md-2">
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: colors.card, borderLeft: '8px solid #66bb6a' }}
          >
            <h2 className="mb-4 text-center fw-bold" style={{ color: colors.heading }}>
              ✍ Ask a Question
            </h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: colors.inputBG }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give a clear title to your question"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="6"
                  style={{ backgroundColor: colors.inputBG }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain your question in detail"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: colors.inputBG }}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. javascript, react, mongodb"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Upload Image (optional)</label>
                <input type="file" className="form-control" onChange={handleFileChange} />
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="preview"
                    className="img-fluid mt-3 rounded border"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success px-4 py-2 fw-semibold">
                  🚀 Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskPage;
