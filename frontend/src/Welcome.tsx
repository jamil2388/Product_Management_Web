import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome: React.FC = () => {
  const location = useLocation();
  const { username } = location.state as { username: string };

  return (
    <div>
      <h3>Username: {username}</h3>
      <h1>Welcome to the Product Management Interface</h1>
    </div>
  );
};

export default Welcome;
