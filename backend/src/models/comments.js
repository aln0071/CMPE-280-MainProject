const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comments = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      },
    description: { type: String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }
});

const commentsModel = mongoose.model("comments",comments);

module.exports =commentsModel;