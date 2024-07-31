import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

// File path for users data
const usersFilePath = path.join(__dirname, 'users.json');

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Adjust as necessary
  credentials: true,
}));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: 'strict' // Ensures cookies are only sent for same-site requests
  },
}));

// Function to read users from the JSON file
const readUsers = (): any[] => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

// Function to write users to the JSON file
const writeUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // @ts-ignore
    req.session.user = { username: user.username };
    res.json({ user: { username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/session', (req: Request, res: Response) => {
  // @ts-ignore
  if (req.session && req.session.user) {
    // @ts-ignore
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No active session or invalid session' });
  }
});

app.post('/logout', (req: Request, res: Response) => {
  // @ts-ignore
  if (req.session && req.session.user) {
    // @ts-ignore
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: 'Logout failed', error: err });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  } else {
    res.status(401).json({ message: 'No active session or invalid session' });
  }
});

// Signup route
app.post('/signup', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const users = readUsers();

  // Check if user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Add new user to the list
  users.push({ username, password });
  writeUsers(users);
  
  res.status(201).json({ message: 'User created successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
