const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
const Message = require("./models/message");
require("dotenv").config();

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://127.0.0.1:27017/crisp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const adminRoutes = require("./routes/adminRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const websiteRoutes = require("./routes/websiteRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/admin", adminRoutes);
app.use("/visitor", visitorRoutes);
app.use("/website", websiteRoutes);
app.use("/message", messageRoutes);

//----------Socket IO
io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
  socket.on("admin", async (message, res) => {
    try {
      const result = await Message.create({
        admin_id: message.admin_id,
        visitor_id: message.visitor_id,
        sender: "visitor",
        message: message.message,
      });
      if (res) {
        res.status(201).json({ message: "message saved" });
      }
      io.emit(message.admin_id, message);
      io.emit(message.visitor_id + "1", message);
    } catch (error) {
      console.error(error);
      if (res) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  });

  socket.on("visitor", async (message, res) => {
    try {
      const result = await Message.create({
        admin_id: message.admin_id,
        visitor_id: message.visitor_id,
        sender: "admin",
        message: message.message,
      });
      if (res) {
        res.status(201).json({ message: "message saved" });
      }
      io.emit(message.visitor_id, message);
    } catch (error) {
      console.error(error);
      if (res) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  });
});
