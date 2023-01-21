const { Productmodel } = require("../MODELS/product.model");
const express = require("express");
const app = express()
var jwt = require('jsonwebtoken');
const userrouter = express.Router();
app.use(express.json())


//******************** RENDER ALL DATA *******************
userrouter.get("/", async (req, res) => {
  try {
    const data = await Productmodel.find();
    res.send(data)
  } catch (err) {
    es.send({ "msg": "Something went wrong" })
  }
})
//******************** Vegetables *******************
userrouter.get("/Vegetables", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
        "Vegetables"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Fruits *******************

userrouter.get("/Fruits", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
        "Fruits"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** foodgrain_oil*******************

userrouter.get("/foodgrain_oil", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
        "Foodgrains, Oil & Masala"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** foodgrain_oil*******************

userrouter.get("/Beverages", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
        "Beverages"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Beauty  *******************

userrouter.get("/Beauty", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      "BEAUTY & HYGIENE"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Snacks *******************

userrouter.get("/Snacks", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      "SNACKS & BRANDED FOODS"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Houshold *******************

userrouter.get("/Houshold", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      "Cleaning & Household"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Kitchens *******************

userrouter.get("/Kitchen", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      "Kitchen, Garden & Pets"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Babycares *******************

userrouter.get("/Babycares", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      " Baby Care"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})
//******************** Eggs *******************
userrouter.get("/Eggs", async (req, res) => {
  try {
    const data = await Productmodel.find({
      Category:
      " Eggs, Meat & Fish"
    });
    res.send(data)
  } catch (err) {
    res.send({ "msg": "Something went wrong" })
  }
})


module.exports = { userrouter }