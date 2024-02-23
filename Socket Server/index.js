const express = require("express");
//const { createServer } = require('node:http');
const { join } = require("node:path");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: { origin: "http://localhost:8081 " },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.broadcast.emit("newClient", {
    description: `${socket.id} connected`,
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(`${socket.io} user disconnected`);
  });

  socket.on("message sent", (msg) => {
    io.emit("message sent", `${socket.id} said: ${msg}`);
    console.log("Message: " + msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
