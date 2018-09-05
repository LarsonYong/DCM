var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 20,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    maxlength:10,
    minlength:3,
    select: false
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
