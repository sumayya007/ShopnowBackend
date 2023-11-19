const mongoose = require("mongoose");
require("dotenv/config");
mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

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
