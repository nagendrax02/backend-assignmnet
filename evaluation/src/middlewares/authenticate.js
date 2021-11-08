require("dotenv").config();
const jwt = require("jsonwebtoken")

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, user){
           if(err){
               return reject(err)
           }
           return resolve(user);
        })
    })
}

const authenticate = async (req, res, next)=>{
    //check if authorization header is present if not thrwo an error
    const bearerToken = req?.headers?.authorization;
    if(!bearerToken){
        return res
        .status(400)
        .json({status:"error", message:"You did not send authroization header"});
    }

    

    // check if authorization header has a bearer token if not throw an error
    if(!bearerToken.startsWith("Bearer ")){
        return res
        .status(400)
        .json({status:"error", message:"You did not send authroization header"});
    }


    // extract the token from bearer  token
    const  token = bearerToken.split(" ")[1];

    //decrypt the token and try to fetch user
    const user =await verifyToken(token);

    console.log(user)

    //add the user to the request 
    if(!user) return res.status(401).json({status:"you are not sending correct token"})
    
    req.user = user.user;

    //return next


    return next();  
};
module.exports = authenticate;