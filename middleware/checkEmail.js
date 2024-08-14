import userModel from "../db/models/user.model.js";
import bcrypt from "bcrypt"
export const checkEmail = async(req,res,next) =>{
    let user = await userModel.findOne({ $or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
      if(user)
        return res.status(409).json({ message: "this email or phone number is already exists" });
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        next()
      
}