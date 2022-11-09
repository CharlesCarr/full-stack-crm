const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  notes: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Call", "Email", "InMail"],
  },
  outcome: {
    type: String,
  },
  prospectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prospect",
  },
});

module.exports = mongoose.model('Interaction', InteractionSchema);