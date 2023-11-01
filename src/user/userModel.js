var mongoose = require('mongoose');
var Schema =mongoose.Schema;

var userSchema = new Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }

});

const mongoose = require("mongoose");

const user = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }

  })
);

module.exports = user;

module.exports = mongoose.model('user', userSchema);
