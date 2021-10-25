const express = require('express');
const router = express.Router();
const User = require('../model/user.model')

const sendEmail = require("../utils/send_mail")

router.post("", async(req, res)=>{

    try{
    const users = await User.create(req.body);
    await sendEmail({
      from: users.email, // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello I am with refactoring last ✔", // Subject line
        text: "I am working fine with refactoring?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    
    return res.status(200).json({users: users,})

    }catch(err){
        return res.status(100).json({status: failed, message: err})
    }
})

router.get("", async(req,res)=>{
    try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page-1 ) * size;

        //total page
        const totalPages= Math.ceil((await User.find().countDocuments()) /size); 



        const users = await User.find().skip(offset).limit(size).lean().exec();
        return res.status(200).json({users: users, totalPage: totalPages})
    }catch(err){
        return res.status(100).json({status:failed, message: err})
    }
})

module.exports = router;          