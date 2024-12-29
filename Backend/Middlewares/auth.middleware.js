const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../Models/blacklistToken.model");


const authUser = async(req,res,next)=>{
    const token =req.cookies.token ||  req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlacklisted = await blackListTokenModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized token khtm block hai hacker"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized hai bhai"});
    }
}


module.exports = {authUser}