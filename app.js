const dotenv=require("dotenv");
dotenv.config({path:"./.env"});
// require('dotenv').config();
const bodyparser = require("body-parser");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser=require("cookie-parser");
const {verify}=require("jsonwebtoken");
const {hash,compare}=require("bcryptjs");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const Grid=require('gridfs-stream');
const multer=require("multer");

const PORT = process.env.PORT || 3000;
const app = new express();
app.use(cors({
  origin: 'https://shopnow-bsu7.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}));

// app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

let gfs;
app.use("/images",express.static(path.join("/images")));
// app.use('/uploads', express.static(__dirname));
// app.use("/images",express.static(path.join("/images")));


app.use("/user", userRoute);
app.use("/admin",adminRoute);

app.use(multer({dest:'./images'}).single('imageUrl'));
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
