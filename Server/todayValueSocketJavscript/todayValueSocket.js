const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const readline = require("readline");

// Create readline interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Listen for 'k' key press
process.stdin.on("keypress", (str, key) => {
    if (key.name === "k") {
        io.sockets.emit("pressed", "We Pressin Now");
    }
});
// Listen for 'k' key press
process.stdin.on("keypress", (str, key) => {
    if (key.name === "j") {
        var rando = Math.floor(Math.random() * 100) + 1;
        io.sockets.emit("encoder", rando);
    }
});

// Add messages when sockets open and close connections
io.on("connection", (socket) => {
    console.log(`[${socket.id}] socket connected`);
    socket.on("disconnect", (reason) => {
        console.log(`[${socket.id}] socket disconnected - ${reason}`);
    });
});

// Show the index.html by default
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// Start the express server
http.listen(3000, function () {
    console.log("listening on *:3000");
});
