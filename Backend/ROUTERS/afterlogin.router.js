const { Cartmodel } = require("../MODELS/cart.model");
const express = require("express");
const app = express()
var jwt = require('jsonwebtoken');
const afterloginrouter = express.Router();
app.use(express.json())


//******************** RENDER ALL DATA *******************
afterloginrouter.get("/", async (req, res) => {
  try {
    const data = await Cartmodel.find();
    await res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
});

//******************** Add to cart*******************
afterloginrouter.post("/addtocart", async (req, res) => {
  let payload=req.body;
  // console.log(payload)
  try {
    const data = await new Cartmodel(payload);
    data.save()
    res.send({"msg":"Added to cart"})
  } catch (err) {
    es.send({ "msg": "Something went wrong" })
  }
})



module.exports = { afterloginrouter }