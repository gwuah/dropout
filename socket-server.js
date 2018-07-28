'use strict';

const socketIO = require('socket.io');
const ot = require('ot')
const sessionList = {}


module.exports = function(server) {

  const str = 'this ins markdown'

  const io = socketIO(server);

  io.on('connection', (socket) => {
    socket.on('joinSession', (data) => {
      if (!sessionList[data.session]) {
        const socketIOServer = new ot.EditorSocketIOServer(str, [], data.session, (socket, cb) => {
          cb(true)
        })
        sessionList[data.session] = socketIOServer

      }
      sessionList[data.session].addClient(socket)
      sessionList[data.session].setName(socket, data.username)
      socket.session = data.session;
      socket.join(data.session)
    })

    // socket.on('mydoc', (data) => {
    //   console.log('askingfordoc')
    //   io.emit('doc', data)
    // })

    socket.on('message', (data) => {
      // console.log("message", data)
      io.emit('message', data);
    })

    socket.on('disconnect', (data) => {
      socket.leave(socket.session)
    })
  })
}