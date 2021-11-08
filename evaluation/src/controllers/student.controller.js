const express = require("express");

const Student = require("../models/student.model");

const router = express.Router();

router.post("", async(req,res)=>{
    try{
       const student = await Student.create(req.body) 
        return res.status(200).send(student)
    }catch(err){
        return res.status(201).send(err.message)
    }
})


router.get("", async(req,res)=>{
    try{
       const student = await Student.find().lean().exec();
       return res.status(200).send(student) 
    }catch(err){
        return res.status(201).send(err.message)
    }
})
module.exports = router;