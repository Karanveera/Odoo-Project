import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand text-success fw-bold fs-4" to="/">
          🌿 StackIt
        </Link>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon text-light"></span>
        </button>

        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">
                Questions
              </Link>
            </li>
            {auth && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/ask">Ask</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/saved">Saved</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin">Admin</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!auth ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm me-2" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success btn-sm" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
