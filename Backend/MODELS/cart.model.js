const mongoose=require("mongoose");
const productschema=mongoose.Schema({
    "Name":String,
    "Category":String ,
    "Price":Number,
    "Image": String,
    "UserID":String
})

const Cartmodel=mongoose.model("CartProducts",productschema);

module.exports={Cartmodel};