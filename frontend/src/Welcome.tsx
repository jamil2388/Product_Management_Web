import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WelcomeProps {
  username: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({ username }) => {
  const navigate = useNavigate();

  if (!username) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default Welcome;
