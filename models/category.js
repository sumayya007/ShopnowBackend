const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
const Schema=mongoose.Schema;

var categorySchema=new Schema({

    name:String,
   
});

var categoryData=mongoose.model("CategoryData",categorySchema);
module.exports=categoryData;