const mongoose = require('mongoose');

const ProspectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  dmLevel: {
    type: String,
    enum: ["Decision Maker", "Influencer"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model('Prospect', ProspectSchema);