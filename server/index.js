const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatRoutes = require("./routes/chat");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));