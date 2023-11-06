const Schema = require("mongoose");
var mongoose = require('mongoose');

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
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Role"
  }
},
  /*{
  timestamp:true
  }*/


);

module.exports= mongoose.model("user", userSchema);
