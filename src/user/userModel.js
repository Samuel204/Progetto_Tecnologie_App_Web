import {Schema} from "mongoose";

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

export default mongoose.model("user", userSchema);
