const express = require("express");
const Lecture = require("../models/lectures.model.js");
console.log(Lecture)

const router = express.Router();
//post 
router.post("", async(req,res)=>{
    try{
        const lecture = await Lecture.create(req.body)
        return res.status(200).send(lecture);
    }catch(err){
        return res.status(201).send(err.message);
    }
})

//get

router.get("", async(req,res)=>{
    try{
        const lectures = await Lecture.find().lean().exec();
        return res.status(200).send(lectures);
    }catch(err){
        return res.status(201).send(err.message);
    }
})

//get by id
router.get("/:id", (req,res)=>{
    try{
        const lectures =  Lecture.findOne({id:req.params.id}).lean().exec();
        return res.status(200).send(lectures);
    }catch(err){
        return res.status(201).send(err.message);
    }
})

// delete
router.delete("/:id", (req,res)=>{
    try{
        const lectures = Lecture.deleteOne({id:req.params.id}).lean().exec();
        return res.status(200).send(lectures);
    }catch(err){
        return res.status(201).send(err.message);
    }
})

//patch

router.put("/:id", async(req,res)=>{
    const lecture = await Lecture.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
       user: req.body.user,
       batch: req.body.batch
    })
})

module.exports = router;