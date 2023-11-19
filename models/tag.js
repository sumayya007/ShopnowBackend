const mongoose=require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
const Schema=mongoose.Schema;

var tagSchema=new Schema({
    name:String,
    count:Number
});

var tagData=mongoose.model("TagData",tagSchema);
module.exports=tagData;