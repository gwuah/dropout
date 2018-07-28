// var findOrCreate = require('mongoose-findorcreate')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  session_id: Schema.ObjectId,
  text: String,
  sender: String
})

module.exports = mongoose.model('Message', messageSchema);