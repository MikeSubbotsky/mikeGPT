const express = require("express");
const functions = require("firebase-functions");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatRoutes = require("./routes/chat");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve the React build files
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//     });
//   }
  
app.use("/api/chat", chatRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

exports.app = functions.https.onRequest(app);
