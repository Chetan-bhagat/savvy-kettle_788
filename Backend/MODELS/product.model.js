const mongoose=require("mongoose");
const productschema=mongoose.Schema({
    "Name":String,
    "Category":String ,
    "Price":Number,
    "Image": String,
})

const Productmodel=mongoose.model("Products",productschema);

module.exports={Productmodel};