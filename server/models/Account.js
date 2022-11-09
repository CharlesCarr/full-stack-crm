const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  industry: {
    type: String,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
