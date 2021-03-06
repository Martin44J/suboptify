const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isBoolean } = require("util");
const {getDefaultPrice} = require("../references/servicePrices.js");

//Broad coarse user schema that is used across the entire app.
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email :{
        type: String, 
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please add a password"], 
        minlength: 6,
        select: false
    }, 
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    shows: Array,
    preferences: {
        netflix: {
            price: { type: Number, default: getDefaultPrice("netflix") },
            numDownloads: { type: Number, default: '1' },
            numConcurrent: { type: Number, default: '1' },
            HDRequired: { type: Boolean, default: 'false' },
            ultraHDRequired: { type: Boolean, default: 'false' },
            displayName: { type: String, default: 'Netflix' }
        },
        hulu: {
            price: { type: Number, default: getDefaultPrice("hulu") },
            noAds: { type: Boolean, default: 'false' },
            displayName: { type: String, default: 'Hulu' }
        },
        hbomax: {
            price: { type: Number, default: getDefaultPrice("hbomax") },
            payYearly: { type: Boolean, default: 'false' },
            downloadsRequired: { type: Boolean, default: 'false' },
            warnerBrosMoviePremieres: { type: Boolean, default: 'false' },
            ultraHDRequired: { type: Boolean, default: 'false' },
            noAds: { type: Boolean, default: 'false' },
            displayName: { type: String, default: 'HBO Max' }
        },
        disneyplus: {
            price: { type: Number, default: getDefaultPrice("disneyplus") },
            payYearly: { type: Boolean, default: 'false' },
            displayName: { type: String, default: 'Disney+' }
        }
    }
});


//For creating the users.
UserSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next();
    }

    //salts and hashes the passwords before saving them.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//makes sure that the passwords math through comparison.
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}


//gets the signed auth token and returns it so it can be used around the app, notice ID.
UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE});
}


//gets/sets the password reset token and the expiring time 10 minutes from when it is generated.
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 *1000);
    return resetToken;
};


const User = mongoose.model("User", UserSchema);

module.exports = User;