import {model, Schema, Types }from "mongoose";

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: { 
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    recoveryEmail: {
      type: String,
      required: true
    },
    password: { 
      type: String, 
      unique: true 
    },
    DOB:{
      type: Date,
      required: true
    },
    phoneNumber:{
      type: Number,
      required: true,
      unique:true
    },
    role:{
      type:String,
      enum:["User","Company_HR"],
      default:"User"
    },
    status:{
      type:String,
      default:"offline"
    },OTPCode:String,
    OTPExpire:Date
  });
const userModel =model('user',userSchema)


export default userModel