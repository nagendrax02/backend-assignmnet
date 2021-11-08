const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate")

const router = express.Router();

router.get("",authenticate, async(req,res)=>{
    const products = await Product.find().lean().exec();
    return res.status(201).send(products)  
})

module.exports = router;
