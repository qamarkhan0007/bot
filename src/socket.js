import socketIOClient from "socket.io-client";
import config from './config'
var socket

export function initSocket() {
  return new Promise((resolve, reject) => {
    socket = socketIOClient(config.socketEndPoint);
    socket.on('connect', function () {
      console.log("Socket Connection Stabilished");
    });
    resolve(socket);
  })
}

export function getSocket() {
  return socket;
}
