'use strict';

const socketIO = require('socket.io');
const ot = require('ot');
const Session = require('./models/Session');
const Message = require('./models/Message');
const sessionList = {}


module.exports = function(server) {

  const str = 'this ins markdown'

  const io = socketIO(server);

  io.on('connection', function(socket) {
    socket.on('joinSession', function(data) {
      if (!sessionList[data.session]) {
        const socketIOServer = new ot.EditorSocketIOServer(str, [], data.session, function(socket, cb) {
          const self = this;
          console.log('sessssion', data.session);
          console.log('docss', self.document)
          Session.findOneAndUpdate({_id:data.session}, {code: self.document }, function(err, data) {
            if (err) { 
              console.log('there was an error', err)
              cb(false) 
            }

            console.log('sucess', data)
            cb(true)
          })
          // cb(true)
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
      const msg = JSON.parse(data);
      const newMessage = new Message({
        sender: msg.sender, 
        text: msg.text, 
        session_id: msg.session_id
      })
      newMessage.save(function(err, msg) {
        io.emit('message', msg)
      });
    })

    socket.on('disconnect', (data) => {
      socket.leave(socket.session)
    })
  })
}