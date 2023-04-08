const express = require("express");
const router = express.Router();
const openai = require("../config/openai");
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('ascii'))),
  });
}

const db = admin.firestore();

const botIdentity = process.env.BOT_IDENTITY;

const conversations = new Map();

router.post("/", async (req, res) => {
  const { message, conversationId } = req.body;

  if (message.length > 50) {
    return res.status(400).json({ error: "Input exceeds 50 characters" });
  }

  let conversation;
  let newConversationId = conversationId;

  if (conversationId && conversations.has(conversationId)) {
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
  
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
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
      //console.log("System message:", systemMessage);

      conversation.push(systemMessage);
      const modifiedMessage = systemMessage.split("Mike: ")[1].trim();

      const messageRef = db.collection("messages").doc(newConversationId);
      await messageRef.set({
        messages: conversation,
      }, { merge: true });

      res.json({ content: modifiedMessage, conversationId: newConversationId });
      break;

    } catch (error) {
      console.error(`Error handling chat request on attempt ${attempt}:`, error);
      const errorMessage = error.response?.data?.error?.message || "OpenAI API is not responding. Please try again later.";

      if (attempt === maxRetries) {
        res.status(500).json({ error: errorMessage });
      }
    }
  }
});


module.exports = router;


    
