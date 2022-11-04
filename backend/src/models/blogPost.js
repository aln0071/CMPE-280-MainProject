const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    topic: { type: String},
    description: { type: String},
    author: { type: String },
    annonymusFlag: { type: Boolean },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      }],
    tags: { type: Array },
});

const blogPostModel = mongoose.model("blogPost",blogPostSchema);

module.exports =blogPostModel;
