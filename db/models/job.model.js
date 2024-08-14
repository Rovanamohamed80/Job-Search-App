import {model, Schema, Types }from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
      type: String,
      required: true
    },
    jobLocation :{
      type:String,
      enum:["onsite","remotely","hybrid"]
    },
    workingTime:{
        type:String,
        enum:["part-time","full-time"]
    },
    seniorityLevel: {
        type: String,
        enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"]
    },
    jobDescription: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: [String],
        required: true
    },
    softSkills: {
        type: [String],
        required: true
    }, addedBy: {
        type: Types.ObjectId,
        ref: "company"
    }
  });
const jobModel =model('job',jobSchema)


export default jobModel