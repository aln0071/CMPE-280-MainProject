const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String},
    username: { type: String },
    password: { type : String },
    email: { type: String },
    aboutme: { type: String },
    city: { type: String },
    phone: { type: String },
    imgKey: {type: String},
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
    createdBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogPost",
      }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }],
    token: { type: String }
});

const userModel = mongoose.model("user",userSchema);

module.exports =userModel;