const express = require("express");
const mongoose = require("mongoose");

const user = require("./modals/user.js")
const app = express();
const path = require("path");
const ExpressError = require("./ExpressError.js");
const AsyncError = require("./AsyncWrapper.js");
const {schemaValidation} = require("./schemaValidation.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public")));

const validation = (req,res,next)=>{
    let {error} = schemaValidation.validate(req.body);
    // let errMsg = error.details.map((el)=> el.message).join(",");
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next()
   }
}

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

app.post("/signup",validation, AsyncError(async(req,res)=>{
    let newUser = new user(req.body.listing);
    await newUser.save();
    res.redirect("/")
        
    }))

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found")) ;
})

app.use((err,req,res,next)=>{
    let{status = 500,message = "internal server error"} = err;
    res.status(status).send(message);
})

app.listen(3000);