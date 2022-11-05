const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const userModel = mongoose.model("user",userSchema);

module.exports =userModel;