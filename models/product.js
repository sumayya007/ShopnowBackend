const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
const Schema=mongoose.Schema;

var productSchema=new Schema({
    name:String,
    price:Number,
    tags:Array,
    favorite:Boolean,
    description:String,
    quantity:Number,
    stars:Number,
    imageUrl:String,
    quantity:Number,
    category:String
});

var productData=mongoose.model("ProductData",productSchema);
module.exports=productData;