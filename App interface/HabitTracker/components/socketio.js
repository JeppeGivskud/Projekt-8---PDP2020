import React from "react";
import { View, Text } from "react-native";
import io from "socket.io-client";

function Socket() {
  const Connect = () => {
    let ip = "http://172.26.19.115:3000";
    ip = "http://localhost:3000";
    const socket = io(ip);
    console.log("We connected to " + ip);
  };

  const listen = () => {
    console.log("We connected to " + socket);

    this.socket.on("message sent", function (data) {
      document.getElementById("ost").innerText = "Message: " + data;
    });
  };
  const send = (Input) => {
    this.socket.emit("message sent", Input);
  };

  return;
}

export default Socket;
