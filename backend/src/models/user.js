const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String},
    username: { type: String },
    password: { type : String },
    email: { type: String },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
    createdBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
    token: { type: String }
});

const userModel = mongoose.model("user",userSchema);

module.exports =userModel;