const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, require: [true, "Name is required."] },
    username: { type: String, require: [true, "Username is required."] },
    password: { type: String, require: [true, "Password is required."] },
});

const UserModel = User.model("User");

export default UserModel;
