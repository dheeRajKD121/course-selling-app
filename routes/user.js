 const express = require('express')
 const router = express.Router();
 const userMiddleware = require("../middleware/user");
const { Course, User } = require('../db');

 router.post('/signup',async(req,res)=>{
   
    const username = req.body.username;
    const password = req.body.password;

   const isUserExist = await User.exists({username})

   if(isUserExist){
    return res.status(400).send({
        message:"User with username is already exist."
    })
   }

   const userCreated = await User.create({username,password})

    return res.status(200).json({
        message:"Signed Up successfully!",
        userId: userCreated._id
    })
 })


  router.get("/courses", async(req,res)=>{

    const courses = await Course.find({})

    return res.status(200).json({
        message:"Courses fetched successfully",
        courses: courses
    })
 })

 router.post("/course/:courseId", userMiddleware, async (req, res) => {
   const courseId = req.params.courseId;
   const username = req.headers.username;
   try {
    const updatedUser= await User.updateOne(
       { username },
       {
         $push : {
          purchasedCourses : courseId,
         },
       },
     );
     console.log(updatedUser)
   } catch (error) {
     console.log(error);
   }

    return res.status(200).send({
    message:"Update completed"
 })
 });



  router.get("/purchasedCourses",userMiddleware,async(req,res)=>{

 const username = req.headers.username
 const user = await User.findOne({username})

 const courses = await Course.find({
    _id:{
        "$in": user.purchasedCourses
    }
 })
    
 return res.status(200).json({
    message:"Data fetched successfully",
    courses:courses
 })
 })


module.exports = router;