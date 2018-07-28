// var findOrCreate = require('mongoose-findorcreate')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  
})

// userSchema.plugin(findOrCreate);

// userSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

// }

// userSchema.methods.validPassword = function(password){
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
//     return this.hash === hash;
// }

module.exports = mongoose.model('Session', sessionSchema);