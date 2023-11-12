const mongoose = require("mongoose");
require("dotenv/config");
mongoose.connect(process.env.MONGODB_URL);

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email:String,
    name:String,
    address:Object,
    password:String,
    role:String
});

var userData = mongoose.model("UserData", userSchema);
module.exports = userData;
