const express = require("express");
const AdminData =require("../models/admin");
const UserData = require("../models/user");
const ProductData=require("../models/product");
const CategoryData=require("../models/category");
const CartItemData=require("../models/cartitem");

const router = express.Router();

const jwt = require("jsonwebtoken");
const { db } = require("../models/admin");

const multer=require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage:storage});
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'ds7qwoo2b',
  api_key: '144671867178944',
  api_secret: 'Fd-l_IWhHWufQBHv0BRg1iNUl9w',
  secure: true,
});

const dotenv=require('dotenv');
 dotenv.config();





// router.post('/uploadimage',upload.single('image'),(req,res)=>{
//   console.log("hi");
//   res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
//   res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
//   console.log("got iamge as",req.file);

//   res.send(req.file);
//   });
  
 router.post("/addProduct",upload.single('image'),(req,res)=>{
  console.log(req.body.file);
  console.log(req.file);
  if(req.file) {
    
    // const file = dataUri(req).content;
    cloudinary.uploader.upload(req.file).then((result) => {
    const image = result.url;
    console.log(image);
    const Product=new ProductData({
      name:req.body.product.name,
      price:req.body.product.price,
      tags:req.body.product.tags,
      favorite:req.body.product.favorite,
      stars:req.body.product.stars,
      imageUrl:result.url,
      category:req.body.product.category
    });
    Product.save();
    return res.status(200).json({
    messge: 'Your image has been uploded successfully to cloudinary',
    data: {
    image
    }
    })
    }).catch((err) => res.status(400).json({
    messge: 'someting went wrong while processing your request',
    data: {
    err
    }
    }))
    }


 console.log("hello");
 
});



function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}






router.post("/signup", (req, res) => {
  console.log(req.body);
  const admin = new AdminData({
    username: req.body.email,
    password: req.body.password,
  });
  admin.save().then(() => {
    res.send("Saved");
  });
});


router.post("/login", (req, res) => {
    let userData = req.body;
    console.log(req.body.username);

    logincheck= AdminData.findOne({
            $and: [{"username":userData.username},
            {"password":userData.password}]})
    .then((adminlogin)=>{
       console.log(adminlogin);
        res.send(adminlogin);
    });
  });

 



  router.get("/adminGetUsers",(req,res)=>{
    UserData.find().then((users)=>{
    res.send(users);
    });
   
  });

  router.get("/getUsers", (req, res) => {
    UserData.find().then((users) => {
      res.send(users);
    });
  });
  router.get("/getAdmin", (req, res) => {
    console.log("inside getadmin");
   AdminData.find().then((admins)=>{
    res.send(admins);
   });
  });

  router.get("/getProductsList", (req, res) => {
    console.log("inside admin getproductlist");
    ProductData.find().then((products) => {
      res.send(products);
    });
  });
  
  router.get("/getCategoriesList", (req, res) => {
    CategoryData.find().then((categories) => {
      res.send(categories);
    });
  });


  router.get("/getProducts/:id", (req, res) => {
    const id=req.params.id;
    ProductData.findOne({"_id":id})
    .then((products) => {
      res.send(products);
    });
  });

 

  // router.delete("/removeProduct", (req, res) => {
  //   ProductData.findByIdAndDelete({ _id: req.body.id }).then(() => {   
  //     res.send("Deleted");
  //   });
  // });
  router.delete('/removeProduct/:id',(req,res)=>{
   
    id = req.params.id;
    ProductData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send(200);
    })
  });
  router.delete('/removeUser/:id',(req,res)=>{
   
    id = req.params.id;
    UserData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send("deleted");
    })
  });

  router.delete('/removeCategory/:id',(req,res)=>{
   
    id = req.params.id;
    CategoryData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send("deleted");
    })
  });

  router.post('/createProduct',upload.single("image"),(req,res)=>{
    res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
      // const file = dataUri(req).content;
      cloudinary.uploader.upload(req.file).then((result) => {
      const image = result.url;
      console.log(image);
    });
      const Product=new ProductData({
        name:req.body.product.name,
        price:req.body.product.price,
        tags:req.body.product.tags,
        favorite:req.body.product.favorite,
        stars:req.body.product.stars,
        imageUrl:req.file,
        category:req.body.product.category
      });
      Product.save();
    
});
      // return res.status(200).json({
      // messge: 'Your image has been uploded successfully to cloudinary',
      // data: {
      // image
      // }
      // })
      // })
      // .catch((err) => res.status(400).json({
      // messge: 'someting went wrong while processing your request',
      // data: {
      // err
      // }
      // }))
     


  router.put("/updateproduct",(req,res)=>{
    console.log(req.body);
    id=req.body._id;
    price=req.body.price;
    ProductData.findByIdAndUpdate({"_id":id},
                                  {$set:{"price":price}
                                })
                                .then(function(){
                                  res.send();
                                });
  });

 

  router.post("/addToCart", (req, res) => {
    res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body._id;
    var cartItem ={
      productId:id,
      productName: req.body.product.name,
      quantity: 1,
      price: req.body.product.price,
    }
    var cartItem=new CartItemData(cartItem);
 
    cartItem.save();
  });


  router.post("/addToCart", (req, res) => {
    res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id=req.body._id;
    var cartItem ={
      productId:id,
      productName: req.body.product.name,
      quantity: 1,
      price: req.body.product.price,
    }
    var cartItem=new CartItemData(cartItem);
 
    cartItem.save();
  });
  


  router.post("/addCategory", (req, res) => {
    res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
   
 
    const Category = new CategoryData({
      name: req.body.category.name,
    });
    Category.save();


  });
  
// router.post("/addImage",upload,(req,res)=>{
//   res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
//   res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
// console.log("inside add image");
// console.log(req.body.file);

// });
 


  router.put('/update',(req,res)=>{
    id=req.body.admin._id;
    email = req.body.admin.email,
    adminname = req.body.admin.adminname,
    password = req.body.admin.password,
   
  AdminData.updateOne({"_id":id},{$set:{
    "email":email,
    "adminname":adminname,
    "password":password
  }}).then(function(){
   console.log("hi")
      res.send();
  });
  
  
  });   

  router.put("/adminupdateuser/:id",(req,res)=>{
 
    id=req.params.id,
    console.log("ids of user is ",id);
    name=req.body.user.name;
    email=req.body.user.email;
    address = req.body.user.address
     console.log(address);
    UserData.findByIdAndUpdate({"_id":id},
                                   {$set:{
                                          
                                           "email":email,
                                           "name":name,
                                           "address":address,
                                          
                                         }
                                 })
                                 .then(function(){
                                   console.log("hii");
                                   res.send();
                                 });
  });
  
  router.put("/adminupdateproduct/:id",(req,res)=>{
 
    id=req.params.id,
    console.log("ids of user is ",id);
    name=req.body.product.name;
    price=req.body.product.price;
    tags = req.body.product.tags;
    imageUrl=req.body.product.imageUrl;
    category=req.body.product.category
    console.log("price",price);
    ProductData.findByIdAndUpdate({"_id":id},
                                   {$set:{
                                          
                                           "name":name,
                                           "price":price,
                                           "tags":tags,
                                           "imageUrl":imageUrl,
                                           "category":category
                                          
                                         }
                                 })
                                 .then(function(){
                                   console.log("hii");
                                   res.send();
                                 });
  });

 
  router.put("/updateadmin/:id",(req,res)=>{
  id=req.params.id;
  address=req.body.user.address;
  UserData.findOneAndUpdate({"_id":id},
                             {$set:{
                                  "address":address,
                             }}
          )
          .then(function(){
          
            console.log("Admin data updated");
            res.send();
          });
  });

  router.put("/adminupdatecategory/:id",(req,res)=>{
 
    id=req.params.id,
    console.log("ids of user is ",id);
    name=req.body.category.name;
   
    CategoryData.findByIdAndUpdate({"_id":id},
                                   {$set:{
                                          
                                           "name":name,
                                           
                                          
                                         }
                                 })
                                 .then(function(){
                                   console.log("hii");
                                   res.send();
                                 });
  });


//   router.get('/getadminbyid/:id',(req,res)=>{
//   var query = { "_id": req.body.params.id };
//  AdminData.findById(query).then(function(admin){
//   res.send(admin);
// });
   
//     });

    router.get('/getadminbyid/:id',(req,res)=>{
      const id=req.params.id;
      AdminData.findOne({"_id":id})
      .then((admin) => {
        res.send(admin);
      });
      });


    
//     router.put('/updateadmin/:id',(req,res)=>
// {
//   id=req.params.id;
//   email= req.body.email;
//   name=req.body.name;
//   address=req.body.user.address;
//   console.log("address is",address)
//   UserData.findOneAndUpdate({"_id":id},{$set:{
//         "email":email,
//         "name":name,
//         "address":address,
//         }})
// .then(function(){
//   console.log("admin updated");
//   res.send();
// });
// });

router.get('/getproductbyid/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","*");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "_id": req.params.id };

  ProductData.find(query).then(function(product){
    console.log(product);
  
    res.send(product);
});
});

router.get('/getuserbyid/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "_id": req.params.id };

  UserData.find(query).then(function(user){
    console.log("user is",user);
  
    res.send(user);
});
});

router.get('/getcategorybyid/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","https://shopnow-wojb.onrender.com");
  res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
  console.log("the gen id is as follows:"+req.params.id)
  var query = { "_id": req.params.id };

  CategoryData.find(query).then(function(category){
    console.log(category);
  
    res.send(category);
});
});
  module.exports = router;
  















































































































































// router.post("/login", (req, res) => {
//   console.log(req.body);
//   loginUser = req.body;
//   var flag = false;
//   AdminData.find().then((user) => {
//     console.log(user);
//     for (let i = 0; i < user.length; i++) {
//       if (
//         loginUser.username == user[i].username &&
//         loginUser.password == user[i].password
//       ) {
//         flag = true;
//         break;
//       } else {
//         flag = false;
//       }
//     }
//     console.log("flag", flag);
//     if (flag == true) {
//       let payload = { subject: loginUser.email + loginUser.password };
//       let token = jwt.sign(payload, "secretKey");
//       res.status(200).send({ token });
//     } else {
//       res.status(401).send("Invalid Credentials");
//     }
//   });
// });

// router.get("/getStudents", (req, res) => {
//   StudentData.find().then((students) => {
//     res.send(students);
//   });
// });

// router.get("/filterStudents", (req, res) => {
//   StudentData.find({ qualification: req.body.qualification }).then(
//     (students) => {
//       res.send(students);
//     }
//   );
// });

// router.post("/postjobs", (req, res) => {
//   console.log("routes"+ req.body);
//   const jobdata=new jobpost({ 
//   employerGenId :req.body.employerGenId,
//   employerName:req.body.employerName,
//   designation: req.body.designation,
//   jobDescription: req.body.jobDescription,
//   passoutYear:req.body.passoutYear,
//   skills:req.body.skills,
//   ictakCourse:req.body.ictakCourse,
//   vaccancies: req.body.vaccancies,
//   salary: req.body.salary,
//   intern:req.body.intern,
//   postedDate: req.body.postedDate,
//   lastDate: req.body.lastDate,
//   experience:req.body.experience,
//   location:req.body.location,
//   });  
//   console.log("Job Data"+jobdata);
//   jobdata.save().then(()=>{
//     res.send("Saved");
//   });
// });

// // active jobs count

// router.get("/jobscount",(req,res,next)=>{
//   jobpost.aggregate([
//     {$group:{
//       _id:1,
//       count:{
//         $sum:1
//       }
//     }
//   },
//   ],
//   (error,data)=>{
//     if(error){
//       return next(error);
//     }
//     else{   
//       res.json(data);
//     }
//   });
//   });

// // List all active Jobs

// router.get("/getjobs", (req, res) => {
//   jobpost.find().then((jobs) => {
//     res.send(jobs);
//     // console.log("Admin Route Get Data" + jobs);
//   });
// });

// router.delete("/deleteStudent", (req, res) => {
//   StudentData.findByIdAndDelete({ _id: req.body.id }).then(() => {   
//     res.send("Deleted");
//   });
// });

// router.get("/getStudents/:id", (req, res) => {
//   const id=req.params.id;
//   studentData.findOne({"_id":id})
//   .then((employers) => {
//     res.send(employers);
//   });
// });

// router.put("/updatestudentpass",(req,res)=>{
//   console.log(req.body);
//   id=req.body._id;
//   password=req.body.password;
//   studentData.findByIdAndUpdate({"_id":id},
//                                 {$set:{"password":password}
//                               })
//                               .then(function(){
//                                 res.send();
//                               });
// });

// // students count on admin home page

// router.get("/studentcount",(req,res,next)=>{
// StudentData.aggregate([
//   {$group:{
//     _id:1,
//     count:{
//       $sum:1
//     }
//   }
// },
// ],
// (error,data)=>{
//   if(error){
//     return next(error);
//   }
//   else{   
//     res.json(data);
//   }
// });
// });

// // add new employer

// router.post("/addEmployer", (req, res) => {
//   const Employer = new EmployerData({
//     companyName: req.body.companyName,
//     employerName: req.body.employerName,
//     designation: req.body.designation,
//     cin: req.body.cin,
//     phone: req.body.phone,
//     email: req.body.email,
//     state: req.body.state,
//     country: req.body.country,
//     profilePic: req.body.profilePic,
//     password: req.body.password,
//   });
//   Employer.save().then(() => {
//     res.send("Employer data saved ");
//   });
// });

// router.get("/getEmployers", (req, res) => {
//   EmployerData.find().then((employers) => {
//     res.send(employers);
//   });
// });

// router.get("/getEmployers/:id", (req, res) => {
//   const id=req.params.id;
//   EmployerData.findOne({"_id":id})
//   .then((employers) => {
//     res.send(employers);
//   });
// });

// // update emploer password

// router.put("/updateemployerpass",(req,res)=>{
//   console.log(req.body);
//   id=req.body._id;
//   password=req.body.password;
//   EmployerData.findByIdAndUpdate({"_id":id},
//                                 {$set:{"password":password}
//                               })
//                               .then(function(){
//                                 res.send();
//                               });
// });



// // employer count on admin home page

// router.get("/employercount",(req,res,next)=>{
//   EmployerData.aggregate([
//     {$group:{
//       _id:1,
//       count:{
//         $sum:1
//       }
//     }
//   },
//   ],
//   (error,data)=>{
//     if(error){
//       return next(error);
//     }
//     else{      
//       res.json(data);
//     }
//   });
   
   
// });

// module.exports = router;
