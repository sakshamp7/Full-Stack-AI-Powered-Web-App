const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config(); // Ensure .env is loaded

// ✅ Load OpenAI API Key correctly (Fixed Key Name)
const OPENAI_API_KEY = process.env.OPEN_AI_KEY; // ✅ Matches .env file

// ✅ Debugging: Check if API key is loaded (REMOVE in production)
console.log("Loaded OpenAI API Key:", OPENAI_API_KEY ? "✅ Key Found" : "❌ Key Missing");

if (!OPENAI_API_KEY) {
    console.error("❌ ERROR: Missing OpenAI API Key in .env file");
    process.exit(1);
}

// ✅ Initialize OpenAI API
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "❌ Message is required!" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 100
        });

        console.log("🔹 OpenAI Response:", response);

        const aiReply = response.choices?.[0]?.message?.content || "❌ No response from AI";

        res.json({ reply: aiReply });
    } catch (error) {
        console.error("❌ Error communicating with OpenAI:", error);

        let errorMessage = "❌ AI response failed";
        if (error.response?.status === 429) {
            errorMessage = "❌ Rate limit exceeded! Upgrade your OpenAI plan.";
        }

        res.status(500).json({ error: errorMessage });
    }
});

module.exports = router;
