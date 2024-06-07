const express = require("express");
const mongoose = require("mongoose");
const user = require("./modals/user.js")
const app = express();
const path = require("path")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

// let user1 = new user({
//     firstName:"rishav",
//         lastName:"kumar",
//         email:"kumarrishavsingh124@gmail.com",
//         contact: 9905682968,
//         password:"abcdefghij"
// });

// user1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
console.log(req.body);
res.send("hi")
    
})


app.listen(3000)