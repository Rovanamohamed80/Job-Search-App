import {model, Schema, Types }from "mongoose";

const applicationSchema = new Schema({
    jobId: {
        type: Types.ObjectId,
        ref: 'job'
    },
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    }, userTechSkills: {
        type: [String],
        required: true
    }, userSoftSkills: {
        type: [String],
        required: true
    },userResume:{
        type:String,
        required: true
    }


})

// applicationSchema.post('init',function(doc) {
// doc.userResume = "http://localhost:3000/uploads/" + doc.userResume
// })




const applicationModel =model('application',applicationSchema)


export default applicationModel