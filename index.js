var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/registration')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")


// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', () => console.error("Error in Connecting to Database"));
// db.once('open', () => console.log("Connected to Database"));

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     phno: String,
//     gender: String,
//     password: String
// });

// const User = mongoose.model('User', userSchema);

// app.post("/sign_up", (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         age: req.body.age,
//         email: req.body.email,
//         phno: req.body.phno,
//         gender: req.body.gender,
//         password: req.body.password
//     });

//     newUser.save((err, user) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error occurred while saving user.");
//         }
//         console.log("Record Inserted Successfully:", user);
//         return res.redirect('/signup_successful.html');
//     });
// });

// app.get("/", (req, res) => {
//     res.set({ "Allow-access-Allow-Origin": '*' });
//     return res.redirect('index.html');
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
