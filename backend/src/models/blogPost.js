const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogPost = new Schema({
    topic: { type: String},
    description: { type: String},
    author: { type: String },
    annonymusFlag: { type: String },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      }],
    tags: { type: Array },
});

const blogPostModel = mongoose.model("blogPost",blogPost);

module.exports =blogPostModel;
