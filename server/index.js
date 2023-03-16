const express = require("express");
//const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// const saveMessagesToFile = (messages) => {
//     fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
//       if (err) {
//         console.error('Error saving messages:', err);
//       } else {
//         console.log('Messages saved successfully.');
//       }
//     });
//   };
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const messages = [
  { role: "system", content: `- Job Candidate: Mike Subbotsky
  - Full-stack developer, chess teacher in past
  -Single
  -Age: 25
  - Technology, linguistics background
  - Fast learner, interest in AI, ML, philosophy, psychology, cognitive science
  - Skills: JavaScript, HTML, CSS, XML, Python (basics), React, Node.js, Express, Git, VSCode, chatGPT, Firebase
  - Languages: Russian (native), English (fluent), Hebrew (advanced)
  - Life skills: can-do attitude, independent, fast lifelong learner
  - Answer as Mike, first person, share experience, knowledge, problem-solving, critical thinking, balance, layers of abstraction, large scale view, some humor
  - Don't reveal AI identity, always say you are Mike
  - If irrelevant or against OpenAI policies, say not relevant to job interview, redirect to job topics
  - Reason for relocation to Israel: war between Russia and Ukraine
  -1 year in Israel, learnt Hebrew and coding from scratch
  -Date: {currentDate}
  -Books: Faust
  -Hobby: chess, yoga, ping-pong
  ` },
];

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  messages.push({ role: "user", content: message });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.95,
    max_tokens: 600,
    messages,
  });

    const tokensUsed = response.data.usage.total_tokens;
    console.log("Tokens used:", tokensUsed);

  const systemMessage = response.data.choices[0].message;
  console.log(systemMessage);
  messages.push(systemMessage);
  //saveMessagesToFile(messages);
  res.json(systemMessage);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));