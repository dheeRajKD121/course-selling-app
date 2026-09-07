 const express = require('express')
 const router = express.Router();
 const { Course, Admin } = require("../db");
 const  AdminMiddleware  = require('../middleware/admin');
 const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../config');

 router.post('/signup',async (req,res)=>{
   
    const username = req.body.username;
    const password = req.body.password;

    const isAdminExist = await Admin.exists({username})
    if(isAdminExist){
      return res.status(400).send({
        message:"Admin with this username is already exist"
      })
    }

    const AdminCreated = await Admin.create({
      username, password
    })

    return res.status(200).json({
        message:"Signed Up successfully!",
        id: AdminCreated._id
    })
 })

 router.post("/signin", async (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   const IsUserExit = await User.findOne({
     username,
     password,
   });

   if (IsUserExit) {
     const token = jwt.sign(
       {
         username,
       },
       JWT_SECRET,
     );

     return res.status(200).send({
       message:"Logged in successfully",
       token,
     });
   } else {
     return res.status(400).send({
       message: "Either username or password is incorrect",
     });
   }
 });

 router.post("/createCourse",AdminMiddleware, async (req,res)=>{

        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;
        const price = req.body.price;

        const createCourse = await Course.create({
          title, description,image,price
        })
   
        return res.status(200).json({
          message: "Course created successfully",
          courseId: createCourse._id
        })


 })

  router.get("/courses",AdminMiddleware, async(req,res)=>{

    const courses = await Course.find({})

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses
    })
 })

  router.put("/courses/:id",(req,res)=>{

    
 })

   router.delete("/courses/:id",(req,res)=>{

    
 })

module.exports = router;