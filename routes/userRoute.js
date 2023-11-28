const express = require("express");
const AdminData = require("../models/admin");
const UserData = require("../models/user");
const ProductData=require("../models/product");
const CartItemData=require("../models/cartitem");
const CartData=require("../models/cart");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

const path = require("path");
const cookieParser=require("cookie-parser");
const {verify}=require("jsonwebtoken");
const {hash,compare}=require("bcryptjs");
const { db } = require("../models/admin");
const userData = require("../models/user");


const {createAccessToken,
      createRefreshToken,
      sendAccessToken,
      sendRefreshToken
    }=require('../token');

// router.post('/userlogin/:dbpass',function(req,res){

//   console.log("inside user login");
//   console.log("dbpassword obtained: ",req.params.dbpass);
// });
// email=req.body.email;
// password=req.body.password;
// dbpassword=req.params.dbpass;
// console.log("user password is: ",password);
// console.log("db password is: ",dbpassword);
// const valid=await compare(password,dbpassword);
// console.log(valid);
//   let paylaod={subject:email+password};
//    let token=jwt.sign(paylaod,'secretKey');
//    console.log(token)
//   if(!valid) throw new Error("Password not correct");
//   const accesstoken=createAccessToken(user.id);
//   const refreshtoken=createRefreshToken(user.id);
//   user.refreshtoken=refreshtoken;
//   sendRefreshtoken(res,refreshtoken);
//   sendAccessToken(req,res,accesstoken);
//    res.status(200).send({token});





router.get("/getUsers", (req, res) => {
    UserData.find().then((users) => {
      res.send(users);
    });
  });
  
 



router.get('/getUserByEmail/:email',function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen email id is as follows:"+req.params.email)
  var query = { "email": req.params.email };

  UserData.find(query).then(function(user){
    console.log("got user by email:",user);
  
    res.send(user);
});
});


router.get("/getCartItems",(req, res) => {
  CartItemData.find().then((cartItems) => {
    res.send(cartItems);
  });
});



router.get('/getCartItemsById/:id', (req, res) => {

  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "userId": req.params.id };

  CartItemData.find(query).then(function(cartitems){
    console.log(cartitems);
  
    res.send(cartitems);
});
});
router.get('/getCartItemsByName/:name', (req, res) => {

  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.name)
  var query = { "name": req.params.name };

  CartItemData.find(query).then(function(cartitems){
    console.log(cartitems);
  
    res.send(cartitems);
});
});


router.get('/getCart/:id', (req, res) => {

  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "_id": req.params.id };

  CartItemData.find(query).then(function(cartitem){
    console.log(cartitem);
  
    res.send(cartitem);
});
});

router.post('/usersignin',async function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("got signin user",req.body.user);
  const user=req.body.user;
  id=req.body.user._id;
  password=req.body.user.password;
  email=req.body.user.email;
  role=req.body.user.role
  var query = { "email": req.body.user.email };

  UserData.find(query).then(function(user){
    const dbpass=user[0].password;
    // const valid= compare(password,dbpass);
    // if(!valid) throw new Error("Password not correct");
    // console.log("valid",valid);
    dbid=user[0]._id;
    dbemail=user[0].email;
    dbrole=user[0].role;
    console.log("role is:",dbid+","+ dbemail+","+dbrole);
    compare(password,dbpass).then((result)=>{
      
       if(result){
        console.log("authentication successful")
        // let paylaod={subject:email+password};
        let paylaod={dbid,dbemail,dbrole}
        
        let token=jwt.sign(paylaod,process.env.ACCESS_TOKEN_SECRET);
        // res.cookie("jwt", token, {
        //   httpOnly: true,
         
        // });
          console.log("token is",token)
          res.status(200).send({token,dbid,dbrole});

      }
    
      else {
        console.log("authentication failed. Password doesn't match");
       
        // jwt.destroy(token);
        return res.json({success: false, message: 'passwords do not match'});
      }
    })
    .catch((err)=>console.error(err))
    
});

 

  // const accesstoken=createAccessToken(user.id);
  //  const refreshtoken=createRefreshToken(user.id);
  //  console.log("access",accesstoken);
  //  console.log("refresh",refreshtoken);
  // // user.refreshtoken=refreshtoken;
  // sendRefreshToken(res,refreshtoken);
  // sendAccessToken(req,res,accesstoken);
});







router.get('/getUserByName/:name',  (req, res) => {
  const name = req.params.name;
  console.log("got it",name)
  
 
  console.log("inside /getemp");
    res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    
    UserData.findOne({"name":name})
    .then((user)=>{
      console.log(user);
        res.send(user);
    });
  
})
router.get('/getProduct/:id', (req, res) => {
  const id=req.params.id;
  ProductData.findById({"_id":id})
  .then((product)=>{
    res.send(product);
  });
});

router.get('/getUserById/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "_id": req.params.id };

  UserData.find(query).then(function(user){
    console.log(user);
  
    res.send(user);
});
});


router.post('/addToCart/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log(req.body.product);
  userid=req.params.id;
  quantity=req.body.product.quantity;
  price=req.body.product.price;
  var cartitem={
    productId:req.body.product._id,
    userId:userid,
    name:req.body.product.name,
    quantity:quantity,
   price:req.body.product.price,
   totalPrice:quantity*price,
   imageUrl:req.body.product.imageUrl
  }
  var cartitem=new CartItemData(cartitem);
  
  console.log("details are as",cartitem);
  cartitem.save();
});


// router.post('/addToBag',function(req,res){
 
//   res.header("Access-Control-Allow-Origin","*");
//   res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');

//   items=req.body.cartItem;
 
//     var cart={
//     items:items
//   }
//   var cart=new cartData(cart);
  
//   console.log("details are on",cart);
//   cart.save();
// });

router.delete('/removeFromCart/:id',(req,res)=>{
   
  id = req.params.id;
  CartItemData.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
});


router.post('/insertUser',async function(req,res){
  console.log("inside insertuser");
  password=req.body.user.password;
  address=""
  const hashedPassword=await hash(password,10);
console.log("admin hash password",hashedPassword)
  const User = new UserData({
    email: req.body.user.email,
    name: req.body.user.name,
    address: req.body.user.address,
    password: hashedPassword,
    address:address,
    role:"basic"
  });
  
  User.save();

  console.log("user data is"+User)

});

router.post('/addToBag/:tPrice/:tCount/',(req,res)=>{
  console.log(req.params.tPrice);
  console.log(req.params.tCount);
  console.log("array "+req.body.cartItems[0].price);
  var now = new Date();
  let cartItems=req.body.cartItems;
  
  const Cart = new CartData({
    items: req.body.cartItems,
    finalPrice:req.params.tPrice,
    finalCount:req.params.tCount,
    paymentId:new ObjectId(),
    createdAt:now,
    status:false
  });
  
  Cart.save();

  console.log("cart data is"+Cart)

});


router.put("/increasequantity/:quantity",(req,res)=>{
  id=req.body._id;
  let qnty=parseInt(req.params.quantity);
  
  newquantity=req.body.quantity+qnty;
  price=req.body.price;
  totalPrice=newquantity*price;
  CartItemData.findByIdAndUpdate({"_id":id},
                                {$set:{"quantity":newquantity,
                                        "totalPrice":totalPrice}
                              })
                              .then(function(){
                                console.log("hii");
                                res.send();
                              });
});

router.put("/decreasequantity",(req,res)=>{
  id=req.body._id;
  decquantity=req.body.quantity-1;
  price=req.body.price;
  totalPrice=decquantity*price;
  CartItemData.findByIdAndUpdate({"_id":id},
                                {$set:{"quantity":decquantity,
                                        "totalPrice":totalPrice}
                              })
                              .then(function(){
                                console.log("hii");
                                res.send();
                              });
});






// router.put("/increasequantity",(req,res)=>{s
// console.log("helo");
//   quantity = req.body.quantity;
  
//  cartItemData.updateOne({"userId":req.params.user},
//                               {$set:{                      
//                               "quantity":quantity+1,
//                               }})
//                             })


// router.post('/insertUser',function(req,res){
//   console.log("inside insertuser");
//   const User = new UserData({
//     email: req.body.user.email,
//     name: req.body.user.name,
//     address: req.body.user.address,
//     password: req.body.user.password
//   });
  
//   User.save();

//   console.log("user data is"+User)

//  });


// router.put('/updateuser/:id',(req,res)=>
// {
//   console.log("id is"+req.params.userId);
 
 
//   email= req.body.user.email,
//   name=req.body.user.name,
//   address = req.body.user.address,
//   password = req.body.user.password

//  UserData.findByIdAndUpdate({"_id":req.params.id},
//                               {$set:{"email":email,
//                               "name":name,
//                               "address":address,
//                               "password":password,
                             
//                             }})
//  .then(function(){
//      res.send();
//  })
// })





router.put("/updateuser/:id",(req,res)=>{
 
  id=req.params.id,
  console.log("ids of user is ",id);
   
   address = req.body.user.address
   console.log(req.body.user.address)
     
   UserData.findByIdAndUpdate({"_id":id},
                                 {$set:{
                                         
                                         "address":address,
                                        
                                       }
                               })
                               .then(function(){
                                 console.log("hii");
                                 res.send();
                               });
});

 

router.put("/updatedata/:mylocation",(req,res)=>{
  console.log("id of user is ",req.body.user._id);
  id=req.body.user._id,
   email= req.body.user.email,
   
   address = req.params.mylocation,
   password = req.body.user.password
   UserData.findByIdAndUpdate({"_id":id},
                                 {$set:{"email":email,
                                         
                                         "address":address,
                                         "password":password
                                       }
                               })
                               .then(function(){
                                 console.log("hii");
                                 res.send();
                               });
 });


//  .then(function(){
 
//      res.send();
//  });

// cartItemData.findOneAndUpdate({userId:"64bdfd35aaf55acb01dcb35d"},{ $inc: { "quantity" : 1} });
// {
//   productId= req.body.productId,
//   userId=req.body.userId,
//   name=req.body.name,
//   quantity = req.body.cartitem.quantity + 1,
//   price = req.body.price,
//   totalPrice = req.body.totalPrice
// }




module.exports = router;