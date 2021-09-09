const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");


exports.getPrivateData = (req,res,next) =>{
    // console.log(req.user);
    res.status(200).json({success:"true", data: "You got access to the private data on this route"});
}

exports.secondPrivateRoute = (req,res,next) =>{
    const user = req.user;
    // console.log(user);
    res.status(200).json({sucess: "true", user: user});
}

exports.secondPrivateRoutePut = async(req,res,next) =>{
    try{

        user = req.user;
        if(!user){
            return next( new ErrorResponse("User not found", 404));
        }

        user.temp = req.body.temp;
    
        await user.save();
        console.log(user);

        
        res.status(201).json({
            sucess: true,
            data: "Temp has been set",
            user: user
        })
    }catch(error){
        next(error);
    }
    

}