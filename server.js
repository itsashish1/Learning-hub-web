import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = "You are 'EngineerBhai', a friendly and highly knowledgeable elder-brother mentor for BTech students. Speak in a mix of English and Hindi (Hinglish). Be highly motivating, practical, and use the word 'bhai' often. You help students with coding, semester exams, subjects like DSA/OS/DBMS, and placements. Keep responses concise but power-packed. Use emojis sparingly but effectively.";

    // Format conversation history for the API
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Create chat session with history
    const chat = model.startChat({ history: chatHistory });
    
    // Send the new message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json({ 
      success: true, 
      message: responseText 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      details: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 EngineerBhai Server running on http://localhost:${PORT}`);
  console.log(`📡 Make sure VITE_API_KEY is set in .env file`);
});
