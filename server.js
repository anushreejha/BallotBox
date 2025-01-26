const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes (you can restrict it later)
app.use(cors({
  origin: 'http://10.17.0.169:5500', // Adjust this to your frontend address
}));

// MongoDB connection string
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

// Create a new MongoClient
const client = new MongoClient(uri);

let db;

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('ballotbox');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Connect to the database when the server starts
connectToDatabase();

// Serve static files from the current directory
app.use(express.static('.'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to BallotBox API');
});

// Example API endpoint to fetch elections
app.get('/api/elections', async (req, res) => {
  try {
    const elections = db.collection('elections');
    const result = await elections.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching elections:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  console.log('Received signup request:', req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });

    console.log('User found:', user);  // Add this line to check if user data is being fetched

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db.collection('users').insertOne({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'An error occurred during signup', error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  console.log('Received login request:', req.body);
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
