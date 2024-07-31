import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Welcome from './Welcome';
import Signup from './Signup';
import './App.css';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/session', { withCredentials: true });
        setUsername(response.data.user.username);
      } catch (error) {
        setUsername(null);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      setUsername(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {username ? (
          <button onClick={handleLogout}>Logout</button>
        ) : null}
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/welcome" element={<Welcome username={username} />} />
          <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
