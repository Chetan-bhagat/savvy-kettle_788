const mongoose=require("mongoose");
const registerschema=mongoose.Schema({
    "Name":String,
    "Email":String ,
    "Location":String,
    "DOB": String,
    "Password":String
})

const registermodel=mongoose.model("GreenBasketRegisters",registerschema);

module.exports={registermodel};