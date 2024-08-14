import userModel from "../../db/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendOurEmail from "../../utili/sendEmail.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utili/appError.js";


//Sign Up .....

const signUp = catchError(async(req,res)=>{
    const{ firstName,lastName,email,recoveryEmail,password,DOB,phoneNumber,role} = req.body;
    const userName = firstName + ' ' + lastName;
    let userr = await userModel.create({firstName,lastName,userName,email,recoveryEmail,password,DOB,phoneNumber,role})
    return res.status(201).json({message: "User created successfully",userr})

})

//sign IN....

const loginuser = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ $or: [{ email: req.body.email },{ userName: req.body.userName },{ recoveryEmail: req.body.recoveryEmail }] })
    if (!user) {
        return next(new AppError("User is not found",404))
    } else {
        let validpass = bcrypt.compareSync(req.body.password, user.password);
        if (validpass) {
            let token = jwt.sign({ id: user.id,firstName: user.firstName,lastName: user.lastName ,userName: user.userName,email: user.email,recoveryEmail: user.recoveryEmail, role: user.role }, process.env.JWT_KEY)
            await userModel.updateOne({_id:user._id},{status:"online"})
            return res.status(201).json({ message: "user login successfully", token: token })

        } else {
            return next(new AppError("invalid password",401))
        }
    }
})

//update account.....

const updateSpecificuser = catchError(async (req, res,next) => {
    const {email,phoneNumber,recoveryEmail,DOB,lastName ,firstName} = req.body;
    const userName = firstName + ' ' + lastName;
    const User = await userModel.findById(req.params.id);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id ) {
      return next(new AppError("You have no access to update this account's information",403))
    }
    let userr = await userModel.findOne({ $or:[{ email:email },{ phoneNumber:phoneNumber }]})
    if(userr && userr._id !== req.user.id){
    return next(new AppError("this email and phone can not use it",404))}
    else{
    let USER=await userModel.findByIdAndUpdate({ _id: req.user.id },{email,phoneNumber,recoveryEmail,DOB,lastName,firstName,userName})
    return res.status(200).json({ message: "this user is updated successfully",USER})}
})

//delete account......

const deleteSpecificuser = catchError(async (req, res,next) => {
    const User = await userModel.findById(req.params.id);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id ) {
        return next(new AppError("You have no access to delete this account's information",403))
     }
    await userModel.deleteOne({_id:req.user.id})
    return res.status(200).json({ message: "this user is deleted successfully"})
})

//Get user account data ...

const getuser = catchError(async (req,res,next) =>{
    const User = await userModel.findById(req.params.id);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id ) {
        return next(new AppError("You have no access to delete this account's information",403))
     }
    let user = await userModel.findOne({_id:req.user.id})
    return res.status(200).json({ message: "this user is got successfully",user})

})

//Get profile data for another user 

const getSpecificuser = catchError(async (req,res,next) =>{
    const {id} = req.params;
    const userId = id;
    const User = await userModel.findById(userId);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    return res.status(200).json({ message: "this user is got successfully",User})

})

// update password....

const updatePassword = catchError(async (req,res,next) =>{
    const User = await userModel.findById(req.params.id);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id ) {
        return next(new AppError("You have no access to get this account's information",403))
     }
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let updateUser = await userModel.updateOne({_id:req.user.id},{password:req.body.password})
    return res.status(200).json({ message: "ths password is updated successfully",updateUser})
})

//forgot password....

const requestPassword = catchError(async (req, res,next) => {
    const {recoveryEmail} = req.body;
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new AppError("User is not found",404))
     }
    else if (req.params.id != req.user.id || recoveryEmail != req.user.recoveryEmail) {
      return next(new AppError("You have no access or Invalid recoveryEmail",403))
     }
    const OTPCode = Math.floor(100000 + Math.random() * 900000);
    const OTPExpire = Date.now() + 20 * 60 * 1000;
    const userName = user.userName;
    await userModel.updateOne({_id:req.user.id},{ OTPCode, OTPExpire });
    sendOurEmail(recoveryEmail, OTPCode, userName);
    return res.status(200).json({ message: "OTP sent to your Email" });

})

// new password..

const resetPassword = catchError(async (req, res,next) => {
    const { recoveryEmail, OTPCode, newPassword } = req.body;
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new AppError("User is not found",404))
     }
    else if (req.params.id != req.user.id || recoveryEmail != user.recoveryEmail) {
        return next(new AppError("You have no access or Invalid recoveryEmail",403))
     }
    if (OTPCode != user.OTPCode || Date.now() > user.OTPExpire) {
        return next(new AppError("Invalid or expired OTP",401))
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    const password = hashedPassword;
    await userModel.updateOne({_id:req.user.id},{password});
    return res.status(200).json({ message: "Password reset successfully" });
})

//Get all accounts associated to a specific recovery Email ..


const getRecoveryEmail = catchError(async (req,res,next) =>{
    const {recoveryEmail} =req.body;
    let user = await userModel.find({recoveryEmail})
    if(!user){
    return next(new AppError("this email is not found",404))}
    else{
    return res.status(200).json({ message: "this user is got successfully",user})}
})


export{
    signUp,loginuser,updateSpecificuser,deleteSpecificuser,getuser,getSpecificuser,updatePassword,requestPassword,resetPassword,getRecoveryEmail
}












