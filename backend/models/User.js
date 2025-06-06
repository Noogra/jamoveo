const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: {
    type: String,
    enum: ["vocals", "guitar", "bass", "keyboard", "drums"],
    required: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
})

module.exports = mongoose.model("User", userSchema)
