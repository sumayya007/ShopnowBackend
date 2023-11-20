const mongoose=require("mongoose");
require("dotenv/config");
mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow");
const Schema=mongoose.Schema;

var categorySchema=new Schema({

    name:String,
   
});

var categoryData=mongoose.model("CategoryData",categorySchema);
module.exports=categoryData;