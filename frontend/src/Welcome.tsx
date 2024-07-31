import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface WelcomeProps {
  username: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="mb-4">Welcome, {username}!</h1>
      <button
        className="btn btn-primary"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Welcome;
