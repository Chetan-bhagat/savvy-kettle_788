const express=require("express");
const {connection}=require("./DATABASE/db.js");
const {registerrouter}=require("./ROUTERS/register.router");
const {adminrouter}=require("./ROUTERS/admin.router")
const {userrouter}=require("./ROUTERS/users.router")
const {afterloginrouter}=require("./ROUTERS/afterlogin.router")
const {access}=require("./Middleware/usertokenaccess")
// require("dotenv").config();  
const app=express();
const cors=require('cors')
app.use(cors({origin:true}))
app.use(express.json())
app.get("/",(req,res)=>{
 res.send("WELCOME")
})
app.use("/sign",registerrouter);
app.use("/admin",adminrouter);
app.use("/products",userrouter);
app.use(access)
app.use("/cart",afterloginrouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("CONNECTED TO DATABASE✔️");
    }catch(err){
        console.log("ERROR❌",err)
    }
    console.log("SERVER IS RUNING GO HEAD✅");
})


