
const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow");
const Schema=mongoose.Schema;

var cartSchema=new Schema({
    items:{
        type:[Schema.Types.ObjectId],
        ref:'cartItem'
    },
    finalPrice:Number,
    finalCount:Number,
    paymentId:String,
    createdAt:String,
    status:Boolean
});
var cartData=mongoose.model("CartData",cartSchema);
module.exports=cartData;