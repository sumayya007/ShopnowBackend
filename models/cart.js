
const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
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