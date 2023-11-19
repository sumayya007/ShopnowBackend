import cartItemData from "./cartitem";
const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
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