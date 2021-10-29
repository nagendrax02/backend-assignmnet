const express = require("express");
const upload = require('../middlewares/fileUpload');
const router = express.Router();
const Product = require('../models/product.model')
router.post("/single", upload.single("productimages"),
 async function(req,res){
    console.log(req.file)
    try{
        const product  = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls:req.file.path
        })
        return res.status(201).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
    
});


router.post("/multiple", upload.any("productimages"), async function(req,res){
    const filePaths = req.files.map((file)=>{
        return file.path;
    })

    try{
        const  product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            image_urls: filePaths
        })
        return res.status(201).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
    console.log(filePaths)
    
});

module.exports = router;