const io = require('socket.io')();

// socket initialization
exports.initSocket = function (server) {
  io.attach(server);
  io.on('connection', async (socket) => {
    socket.on('disconnect', async function (err, data) {
    });
  });
}

exports.refreshChat = function () {
  io.emit("refreshChat", new Date());
}
