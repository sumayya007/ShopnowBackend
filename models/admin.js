const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow");
const Schema = mongoose.Schema;

var adminSchema = new Schema({
   
    email:String,
    adminname:String,
    password:String
});

var adminData = mongoose.model("AdminData", adminSchema);
module.exports = adminData;
