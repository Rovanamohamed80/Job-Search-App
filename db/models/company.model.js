import {model, Schema, Types }from "mongoose";

const companySchema = new Schema({
    companyName: {
      type: String,
      unique:true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    industry: { 
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    numberOfEmployees: {
      type: Number, min: 11, max: 20 ,
      required: true
    },
    companyEmail: { 
      type: String, 
      unique: true,
      required:true
    },
    companyHR:{
        type: Types.ObjectId,
        ref: 'user'
      }
})
const companyModel =model('company',companySchema)


export default companyModel