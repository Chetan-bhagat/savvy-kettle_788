const jwt = require("jsonwebtoken");
require("dotenv").config();  

const access=async(req,res,next)=>{
   if(req.method=="GET"){
    next();
   }else{
    const token=req.headers.token;
   try{
    var decoded = jwt.verify(token, process.env.key);
    
    if(decoded){
        // console.log(decoded,req.body)
        req.body.UserID=decoded.ID;
        console.log(decoded.ID,req.body,req.body.UserID);
        next()
    }else{
        res.send({"msg":"LOGIN FIRST"})
    }
   }catch(err){
    console.log(decoded,token)
    res.send({"msg":err})
   }
   }
}

module.exports={access};