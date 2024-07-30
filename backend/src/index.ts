import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dummyUser = {
  username: 'testuser',
  password: 'password123'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === dummyUser.username && password === dummyUser.password) {
    res.status(200).json({ message: 'Login successful', user: dummyUser });
  } else {
    console.log('Invalid login attempt:', { username, password });
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

