const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String},
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
    createdBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
});

const userModel = mongoose.model("user",user);

module.exports =userModel;