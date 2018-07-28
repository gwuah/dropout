'use strict';

var socketIO = require('socket.io');

module.exports = function(server) {
  var io = socketIO(server);

  io.on('connection', (socket) => {
    socket.on('joinSession', (data) => {
      socket.session = data.session;
      socket.join(data.session)
    })

    socket.on('message', (data) => {
      console.log("message", data)
      io.emit('message', data);
    })

    socket.on('disconnect', (data) => {
      socket.leave(socket.session)
    })
  })
}