import groq from "../utils/geminiClient.js";

export async function chatAI(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a helpful ecommerce assistant. Reply in clear, simple English.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() || "No reply";

    return res.status(200).json({ reply });
  } catch (error) {
    console.log("AI ERROR:", error);
    return res.status(500).json({ reply: "Server issue! Try again 😐" });
  }
}

export async function listModels(req, res) {
  try {
    const models = await groq.models.list();
    return res.status(200).json(models.data || []);
  } catch (err) {
    console.log("MODEL ERROR:", err);
    return res.status(500).json({ message: "Cannot load models" });
  }
}
