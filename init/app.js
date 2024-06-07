const mongoose = require("mongoose");
const user = require("../modals/user.js");

main().then(()=>{
    console.log("connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

try{
    user.insertMany([{
        firstName:"rambo",
        lastName:"kumar",
        email:"kumarrishavsingh1245@gmail.com",
        contact: 99056829468,
        password:"abcdefghidj"
    },
    {
        firstName:"ram",
        lastName:"ashis",
        email:"ramashish@gmail.com",
        contact: 4565825845,
        password:"abcfghdeg"
    }])
}catch(err){
    console.log(err);
}

