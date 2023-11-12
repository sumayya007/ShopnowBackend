const mongoose = require("mongoose");
require("dotenv/config");
mongoose.connect(process.env.MONGODB_URL);

const Schema = mongoose.Schema;

var adminSchema = new Schema({
   
    email:String,
    adminname:String,
    password:String
});

var adminData = mongoose.model("AdminData", adminSchema);
module.exports = adminData;
