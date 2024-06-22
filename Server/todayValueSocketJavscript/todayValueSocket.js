const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const readline = require("readline");

// Create readline interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var count = 0;
// Listen for 'j' key press
process.stdin.on("keypress", (str, key) => {
    if (key.name === "j") {
        count--;
        io.sockets.emit("encoder", count);
    }
});
// Listen for 'k' key press
process.stdin.on("keypress", (str, key) => {
    if (key.name === "k") {
        setTimeout(() => {
            io.sockets.emit("pressed", "We Pressin Now");
        }, 200);
    }
});
// Listen for 'l' key press
process.stdin.on("keypress", (str, key) => {
    console.log("Count is currently", count);
    if (key.name === "l") {
        count++;
        io.sockets.emit("encoder", count);
    }
});

// Listen for 's' key press
process.stdin.on("keypress", (str, key) => {
    if (key.name === "s") {
        console.log("Exiting the program...");
        process.exit(0);
    }
});

// Add messages when sockets open and close connections
io.on("connection", (socket) => {
    console.log(`[${socket.id}] socket connected`);
    socket.on("disconnect", (reason) => {
        console.log(`[${socket.id}] socket disconnected - ${reason}`);
    });
    socket.emit("getCount", "getCount");
    socket.on("sendCount", (Count) => {
        count = Count;
        console.log(`[${Count}] is nice`);
        console.log(`[${count}] is nice`);
    });
});

// Show the index.html by default
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// Start the express server
http.listen(3000, function () {
    console.log("listening on *:3000");
});
