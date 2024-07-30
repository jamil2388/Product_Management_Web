import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const users = [
  { username: 'testuser1', password: 'password123' },
  { username: 'testuser2', password: 'password456' },
  { username: 'testuser3', password: 'password789' },
  { username: 'testuser4', password: 'password012' },
  { username: 'testuser5', password: 'password345' },
  { username: 'testuser6', password: 'password678' },
  { username: 'jamil2388', password: 'password901' },
  { username: 'testuser8', password: 'password234' },
  { username: 'testuser9', password: 'password567' },
  { username: 'testuser10', password: 'password890' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // iterates through the users of users var and finds a match
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    console.log('Invalid login attempt:', { username, password });
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

