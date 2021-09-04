const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

//important routes for authentication, self explanitory.

exports.register = async (req,res,next)=>{
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
}

exports.login = async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try{
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 401));

        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401));

        }

        sendToken(user,200,res);
    }catch (error){
        res.status(500).json({success: false, error: error.message});
    }
}

exports.forgotPassword = async (req,res,next)=>{
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            console.log("here1");
            return next(new ErrorResponse("Email could not be sent", 404));
        }else{

        }


        //gets password token from the userschema method.
        const resetToken = user.getResetPasswordToken();
        

        await user.save()

        //reset url ****MUST CHANGE WHEN DEPLOYING WEBSITE*******
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        //message to send to people when reseting password.
        const message = `
        <h1> You have requested a password reset</h1>
        <p> please follow this link to reset your password </p>
        <a href=${resetUrl} clicktracking=off/>${resetUrl}</a>
        `;

        try {
            //sending the actual email
            await sendEmail({
                to: user.email,
                subject: "Reset Password for Suboptify",
                text: message
            });

            res.status(200).json({success: true, data: "email sent"});

        } catch (err) {
            //catch errors, need to set these undefined to avoid issues.
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async(req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        if(!user){
            return next( new ErrorResponse("Invalid reset Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            sucess: true,
            data: "Password reset sucess"
        })
    } catch (error) {
        next(error);
    }
}


//method used for sending the token, (probably needs modification);
const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token});
}