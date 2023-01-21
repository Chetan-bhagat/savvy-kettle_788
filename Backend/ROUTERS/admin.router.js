const {Productmodel}=require("../MODELS/product.model");
const express=require("express");
const app=express()
var jwt = require('jsonwebtoken');
const adminrouter=express.Router();
app.use(express.json())


//******************** ADD NOTES *******************
adminrouter.post("/addproduct",async(req,res)=>{
    const payload=req.body;
    try{ 
      const data=await new Productmodel(payload);
      await data.save();
      res.send({"msg":"product added"})
    }catch(err){
      es.send({"msg":"Something went wrong"})
    }
})
//******************** Update NOTES *******************
adminrouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    try{ 
      const data=await Productmodel.findByIdAndUpdate({"_id":ID},payload);
      res.send({"msg":"product updated"})
    }catch(err){
      res.send({"msg":"error"})
    }
})
//******************** ADD NOTES *******************
adminrouter.delete("/delete/:id",async(req,res)=>{
  const ID=req.params.id;
  try{ 
    const data=await Productmodel.findByIdAndDelete({"_id":ID});
    res.send({"msg":"product deleted"})
  }catch(err){
    console.log(err)
    res.send({"msg":"error"})
  }
})


module.exports={adminrouter}