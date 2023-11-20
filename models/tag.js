const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow");
const Schema=mongoose.Schema;

var tagSchema=new Schema({
    name:String,
    count:Number
});

var tagData=mongoose.model("TagData",tagSchema);
module.exports=tagData;