const DatauriParser=require("datauri/parser.js");
const path=require("path");
const getDataUri= new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
module.exports=dataUri;