const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://10.17.0.169:5500' }));

// SQLite database connection
const db = new sqlite3.Database('./ballot_box.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Serve static files from the current directory
app.use(express.static('.'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to BallotBox API');
});

// Example API endpoint to fetch elections
app.get('/api/elections', (req, res) => {
  db.all('SELECT * FROM elections', [], (err, rows) => {
    if (err) {
      console.error('Error fetching elections:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], async (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
      if (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'An error occurred during signup' });
        return;
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
