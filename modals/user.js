const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
         type:String,
         required:true
    },
    lastName:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
        length:10
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }

})

const user = mongoose.model("user",userSchema);

module.exports = user;
