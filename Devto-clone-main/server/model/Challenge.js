const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    badgeTile: {
      type: String,
    },
    badgeUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
