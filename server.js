// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Insert your OpenRouter API key here
const OPENROUTER_KEY = "YOUR_API_KEY_HERE";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    console.log("🔎 OpenRouter raw:", data); // Debug log

    const reply = data.choices?.[0]?.message?.content?.[0]?.text || "No reply from AI";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "OpenRouter request failed" });
  }
});

app.listen(3000, () => console.log("✅ Proxy running on http://localhost:3000"));
