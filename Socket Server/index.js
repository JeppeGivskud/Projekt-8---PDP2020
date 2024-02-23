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

  cors: { origin: "http://localhost:8081" },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.join("room1");
  socket.broadcast.to("room1").emit("newClient", {
    description: `${socket.id} has connected`,
  });

  socket.on("disconnect", () => {
    console.log(`${socket.io} user disconnected`);
    io.to("room1").emit("disconnection", {
      description: `${socket.id} has disconnected`,
    });
  });

  socket.on("message sent", (msg) => {

    io.to("room1").emit("message sent", `${socket.id} said: ${msg}`);
    console.log("Message: " + msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
