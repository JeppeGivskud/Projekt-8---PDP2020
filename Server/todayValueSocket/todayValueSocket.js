const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Add messages when sockets open and close connections
io.on("connection", (socket) => {
    console.log(`[${socket.id}] socket connected`);
    socket.on("disconnect", (reason) => {
        console.log(`[${socket.id}] socket disconnected - ${reason}`);
    });
});

// Broadcast the current server time as global message, every 1s
setInterval(() => {
    var rando = Math.floor(Math.random() * 100) + 1;
    io.sockets.emit("newTodayValue", { rando });
}, 1000);

// Show the index.html by default
app.get("/", (req, res) => res.sendFile("index.html"));

// Start the express server
http.listen(3000, function () {
    console.log("listening on *:3000");
});
