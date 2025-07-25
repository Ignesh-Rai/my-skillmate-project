const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Message = require('./models/message');
const Note = require('./models/note');
const app = express();
const PORT = 5000;

// ✅ Serve static files
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/message', async (req, res) => {
  const { name, text } = req.body;
  try {
    const newMessage = new Message({ name, text });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { title, text } = req.body;
  try {
    const newNote = new Note({ title, text });
    await newNote.save();
    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// ✅ Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
