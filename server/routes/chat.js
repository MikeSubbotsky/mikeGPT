const express = require("express");
const router = express.Router();
const openai = require("../config/openai");

const botIdentity = process.env.BOT_IDENTITY;

const messages = [
  "Interviewer: Hi, Mike nice to meet you!\n",
  "Mike: Hi, there!\n"
];

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (message.length > 50) {
    return res.status(400).json({ error: "Input exceeds 50 characters" });
  }

  // Add the new message from the user to the messages array
  messages.push(`Interviewer: ${message}\n`);

  // Get the last 5 messages
  const lastFiveMessages = messages.slice(-5).join("\n");
  const prompt = botIdentity + lastFiveMessages;
  console.log(prompt);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["Interviewer:"],
    });

      const tokensUsed = response.data.usage;
      console.log("Tokens used:", tokensUsed);

      const systemMessage = response.data.choices[0].text.trim();
      messages.push(systemMessage);
      const messageWithoutRole = systemMessage.replace("Mike: ", ""); // Remove "Mike: " from the message content
      
      console.log(messageWithoutRole);
      res.json({ content: messageWithoutRole });
    } catch (error) {
      console.error("Error handling chat request:", error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred while processing your request. Please try again later.";
      res.status(500).json({ error: errorMessage });
    }
});


module.exports = router;


    
