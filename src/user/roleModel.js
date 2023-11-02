const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    role:{
      type: String,
      required:true
    }
  },
  {
    timestamps:true
  }
);

export default mongoose.model("Role", RoleSchema)
