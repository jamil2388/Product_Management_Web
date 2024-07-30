import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: 'testuser',
          password: 'password123'
        });
        console.log('Login response:', response.data); // Log the response
        setUsername(response.data.user.username); // Assuming `response.data.user.username` is correct
      } catch (err) {
        const error = err as any;
        console.error('Login failed:', error.response?.data || error.message); // Log the error
        setError('Login failed');
      }
    };

    login();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Username: {username || 'Loading...'}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h1>Welcome to the Product Management Interface</h1>
      </header>
    </div>
  );
};

export default App;

