import cartItemData from "./cartitem";
const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_URL);
const Schema=mongoose.Schema;
var orderSchema=new Schema({
    orderId:String,
    items:cartItemData,
    totalPrice:Number,
    name:String,
    address:String,
    paymentId:String,
    createdAt:String,
    status:String
});

var orderData=mongoose.model("OrderData",orderSchema);
module.exports=orderData;