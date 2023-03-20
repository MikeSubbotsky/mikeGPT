const express = require("express");
const router = express.Router();
const openai = require("../config/openai");
const { v4: uuidv4 } = require("uuid");


const botIdentity = process.env.BOT_IDENTITY;

const conversations = new Map();


// const messages = [
//   "Interviewer: Hi, Mike nice to meet you!\n",
//   "Mike: Hi, there!\n"
// ];

router.post("/", async (req, res) => {
  const { message, conversationId } = req.body;

  if (message.length > 50) {
    return res.status(400).json({ error: "Input exceeds 50 characters" });
  }

  let conversation;
  let newConversationId = conversationId;

  if (conversationId) {
    conversation = conversations.get(conversationId);
  } else {
    newConversationId = uuidv4();
    conversation = [
      "Interviewer: Hi, Mike nice to meet you!\n",
      "Mike: Hi, there!\n",
    ];
    conversations.set(newConversationId, conversation);
  }

  conversation.push(`Interviewer: ${message}\n`);

  const lastFiveMessages = conversation.slice(-5).join("\n");
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
      conversation.push(systemMessage);
      const messageWithoutRole = systemMessage.replace("Mike: ", ""); 
      
      console.log(messageWithoutRole, newConversationId);
      res.json({ content: messageWithoutRole, conversationId: newConversationId });
    } catch (error) {
      console.error("Error handling chat request:", error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred while processing your request. Please try again later.";
      res.status(500).json({ error: errorMessage });
    }
});


module.exports = router;


    
