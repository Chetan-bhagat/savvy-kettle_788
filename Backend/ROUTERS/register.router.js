const {registermodel} = require("../MODELS/register.model");
const express=require("express");
const app=express()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const registerrouter=express.Router();
app.use(express.json())

// *****************ALL REGISTERED USER****************

registerrouter.get("/",async(req,res)=>{
    try{ 
        const allregister= await registermodel.find();;
        console.log("ALL THE REGISTER USERS IS AS FOLLOWES");
        res.send(allregister)

    }catch(err){
        console.log("ERROR IN GET IN REGISTER_ROUT",err)
    }
});
// *****************NEW REGISTERED USER****************
registerrouter.post("/register",async(req,res)=>{
    const payload=req.body
    let email=payload.Email;
    let check=await registermodel.find({Email:email});
    if(check.length>0){
        res.send({"msg":"Email Already Exist"});
    }else{
        try{ 
            console.log(payload)
            bcrypt.hash(payload.Password, 2, async(err, hash)=> {
               try{
                if(hash){
                    payload.Password=hash;
                    const data= await new registermodel(payload);
                    await data.save()
                    const allregister= await registermodel.find();
                    console.log("NEW REGISTRATION SUCCESSFUL")
                    await res.send(allregister);
                   }else{
                    res.send("ERROR WHILE HASHING")
                   }
               }catch(err){
                console.log("ERROR IN REGISTER",err)
                res.send("ERROR IN REGISTER")
               }
            });
        //    res.send("Done")
    
        }catch(err){
            console.log("ERROR",err)
        }
    }
                
});

// *****************LOGIN REGISTERED USER****************

registerrouter.post("/login",async(req,res)=>{
    const {Email,Password}=req.body;
    try{ 
        const data= await registermodel.find({Email});
        // console.log(data)
       if(data.length>0){
        bcrypt.compare(Password, data[0].Password, function(err, result) {
            if(result){
                var token = jwt.sign({ ID: data[0]._id }, process.env.key);
                res.send({"msg":"LOGGIN SUCCESSFUL",
               "token":token,"username":data[0].Name,"UserID":data[0]._id });
            }else{
               res.send({"msg":"Invalid Password"})
            }
        });
       }else{
        res.send({"msg":"Email not Found"})
       }
       
    }catch(err){
        console.log("ERROR",err)
    }
})

module.exports={registerrouter}