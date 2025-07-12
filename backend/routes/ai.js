const express = require('express');
const router = express.Router();
const axios = require('axios');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/suggest', verifyToken, async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'user',
            content: `Answer this question: ${question}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ should be valid
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'StackIt AI Answerer'
        },
      }
    );

    const aiAnswer = response.data.choices?.[0]?.message?.content?.trim();
    console.log('✅ AI Response:', aiAnswer);
    res.json({ answer: aiAnswer || 'AI returned no content.' });

  } catch (err) {
    console.error('❌ OpenRouter Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'AI failed to respond' });
  }
});

module.exports = router;
