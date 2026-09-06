
const {mongoose} = require('mongoose')


// connect to mongoDB

mongoose.connect('mongodb+srv://dheerajks2026_db_user:pTdbqmHtHl3xJeEW@cluster0.fcq1gjw.mongodb.net/education-platform')


// Define Schema

const AdminSchema = new mongoose.Schema({
     username:  String,
     password:  String
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
})


const CoursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
})

const Admin = mongoose.model('Admin',AdminSchema)
const Course= mongoose.model('Course', CoursesSchema)
const User = mongoose.model('User', UserSchema)


module.exports ={
    Admin,
    User,
    Course
}