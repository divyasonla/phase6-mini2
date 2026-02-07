require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/notes', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    res.status(201).json({ message: 'Note submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit note' });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Note Manager is running on http://localhost:${PORT}`);
});