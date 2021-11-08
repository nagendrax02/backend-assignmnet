const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model")
const newToken = (user)=>{
    return jwt.sign({user: user}, process.env.JWT_SECRET_KEY)
}


const register = async(req,res)=>{
    try{
    //first check if a user with that email already exists
        let user = await User.findOne({email:req.body.email}).lean().exec();
           //if user exists then throw an error
        if(user) return res.status(400).json({status:"error", message:"user already exist"});


    //otherwise create a user and then hash the password
    user = await User.create(req.body);
    //create a token
    const token = newToken(user);
    //return the user
    return res.status(201).json({user,token}); 
    }catch(err){
        return res.status(200).send(err.message)
    }
}

const login = async (req,res)=>{
   try{
    //first check if a user with email already exists
    let user = await User.findOne({email:req.body.email}).exec();

    //if not a user then throw an error
    if(!user){
        return res
        .status(400)
        .json({status:"error", message: "User is not registered please register first"});
    }

    //if user then match the password
    const match = user.checkPassword(req.body.password);
    //if not match then throw then error
    if(!match){
        return res
        .status(400)
        .json({status: "error", message: "Invalid password"})
    }
    //if match then create a token
    const token = newToken(user);
    //return the token to frontend
    return res.status(201).json({user,token})
    }catch(err){return res.status(200).send(err.message)}
}
const getUser = (async(req,res)=>{
    try{
        const users = await User.find().lean().exec();
        return res.status(200).send(users)
    }catch(err){
        return res.status(201).send(err.message)
    }
})
module.exports = {register,login, getUser};