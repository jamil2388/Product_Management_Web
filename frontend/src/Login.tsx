import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      }, { withCredentials: true });
      setUsername(response.data.user.username);
      navigate('/welcome');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <h2 className="text-center display-4 mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setLocalUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>Don't have an account?</span>
            <a href="/signup" className="btn btn-secondary w-50">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
