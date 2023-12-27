// const dotenv=require("dotenv");
// dotenv.config({path:"./.env"});
// require('dotenv').config();
const bodyparser = require("body-parser");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
// const path = require("path");
const cookieParser=require("cookie-parser");
const {verify}=require("jsonwebtoken");
const {hash,compare}=require("bcryptjs");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const Grid=require('gridfs-stream');

const fileupload=require("express-fileupload");
/////////////////////////

const { urlencoded, json }=require('body-parser');
const path=require('path');


const fs=require('fs');
const app = express();
const Port = process.env.PORT || 3000;
// app.use(express.static(resolve(__dirname, '/images')));
app.use(urlencoded({ extended: false }));
app.use(json());

////////////////////////


// app.use(fileupload({
//   useTempFiles:true
// }))
app.use(cors({
  origin: ['https://shopnow-wojb.onrender.com','http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}));

// app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

let gfs;
app.use("/images",express.static(path.join(__dirname+"/images")));
// app.use('/uploads', express.static(__dirname));
// app.use("/images",express.static(path.join("/images")));


app.use("/user", userRoute);
app.use("/admin",adminRoute);

// app.use(multer({dest:'./images'}).single('imageUrl'));
app.listen(Port, () => {
  console.log(`listening to ${Port}`);
});

