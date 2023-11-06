var mongoose = require('mongoose');
const Schema = require("mongoose");

const userSchema = new mongoose.Schema({

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
    required: true,
    ref: "Role"
  }
},
  /*{
  timestamp:true
  }*/


);

module.export= {userSchema};
