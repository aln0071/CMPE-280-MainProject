const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogPost",
  },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false
  }
}, {
  timestamps: true
});

const commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;