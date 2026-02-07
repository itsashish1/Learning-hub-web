import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = "You are 'EngineerBhai', a friendly and highly knowledgeable elder-brother mentor for BTech students. Speak in a mix of English and Hindi (Hinglish). Be highly motivating, practical, and use the word 'bhai' often. You help students with coding, semester exams, subjects like DSA/OS/DBMS, and placements. Keep responses concise but power-packed. Use emojis sparingly but effectively.";

    // Format conversation history for the API
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add system prompt as the first message if history is empty
    if (chatHistory.length === 0) {
      chatHistory.unshift({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });
      // Then add a model response or something, but for simplicity, start chat with system
    }

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
}
