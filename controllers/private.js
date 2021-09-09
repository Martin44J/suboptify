exports.getPrivateData = (req,res,next) =>{
    // console.log(req.user);
    res.status(200).json({success:"true", data: "You got access to the private data on this route"});
}

exports.secondPrivateRoute = (req,res,next) =>{
    const user = req.user;
    console.log(user);
    res.status(200).json({sucess: "true", user: user});
}