
const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect("mongodb+srv://shopnow:V7NIS1V1RCAppVPL@cluster0.3nral.mongodb.net/ShopNow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
const Schema=mongoose.Schema;

// var cartSchema=new Schema({
//     items:[{
//         type:[Schema.Types.ObjectId],
//         ref:'cartItem'
//     }],
//     finalPrice:Number,
//     finalCount:Number,
// });

// var cartData=mongoose.model("CartData",cartSchema);
// module.exports=cartData;

var cartItemSchema=new Schema({
    productId:String,
    userId:String,
    name:String,
    quantity:Number,
    price:Number,
    totalPrice:Number,
    imageUrl:String
});

var cartItemData=mongoose.model("CartItemData",cartItemSchema);
module.exports=cartItemData;