import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Welcome from './Welcome';
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

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {username ? <button onClick={async () => {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
            setUsername(null);
          }}>Logout</button> : null}
          <Routes>
            <Route path="/" element={<Login setUsername={setUsername} />} />
            <Route path="/welcome" element={<Welcome username={username} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
