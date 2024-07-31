import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const Signup: React.FC<SignupProps> = ({ setUsername }) => {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', { username: localUsername, password });
      if (response.status === 201) {
        setUsername(localUsername); // Set the username state
        navigate('/welcome');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during signup');
      }
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#1e2445' }}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <h2 className="text-center display-4 mb-4">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                required
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>Already have an account?</span>
            <a href="/" className="btn btn-secondary w-50">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
