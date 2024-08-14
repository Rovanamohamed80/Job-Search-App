import applicationModel from "../../db/models/application.model.js";
import companyModel from "../../db/models/company.model.js"
import jobModel from "../../db/models/job.model.js";
import userModel from "../../db/models/user.model.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utili/appError.js";
import jobRouter from "./job.routes.js";


//Add Job ...

const addjob =catchError( async (req,res,next)=>{
    const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills} = req.body;
    let user = await userModel.findOne({_id:req.user.id,role:"Company_HR"});
    if (!user) {
        return next(new AppError("You have no access to add this job",403))
     }
     req.body.addedBy = req.user.id;
    const addedBy = req.body.addedBy
     let job = await jobModel.create({jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy});
     return res.status(200).json({ message: "the job added successfully",job });
}
)

//update Job ...

const updatejob = catchError(async (req,res,next)=>{
    const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills} = req.body;
    let user = await userModel.findOne({_id:req.user.id,role:"Company_HR"});
    if (!user) {
        return next(new AppError("You have no access to update this job",403))
     }
     let job = await jobModel.findOne({_id:req.params.id});
     if(!job)
        return next(new AppError("job is not found",404)) 
    if(job.addedBy == req.user.id){
     let jobs = await jobModel.updateOne({_id:req.params.id},{jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills});
     return res.status(200).json({ message: "the job updated successfully",jobs });}
     else{ 
        return next(new AppError("you can not to modify this job",403))
     }
})

// delete Job ...

const deletejob = catchError(async (req,res,next)=>{
    let user = await userModel.findOne({_id:req.user.id,role:"Company_HR"});
    if (!user) {
        return next(new AppError("You have no access to delete this job",403))
     }
     let job = await jobModel.findOne({_id:req.params.id});
     if(!job)
        return next(new AppError("job is not found",404))  
    if(job.addedBy == req.user.id){
     let applicatons = await applicationModel.find({jobId:req.params.id})
     if(applicatons){
     await jobModel.deleteOne({_id:req.params.id});
     await applicationModel.deleteMany({jobId:req.params.id})
     return res.status(200).json({ message: "the job deleted successfully"});
   }
     else{
      return next(new AppError("application is not found", 404));
     }}
     else{
     return next(new AppError("You can not modify this job", 403))
     }  
})

//Get all Jobs with their company’s information.

const getAllJobsWithCompanys = catchError(async(req,res,next)=>{
    const User = await userModel.findById(req.user.id);
    if (!User) {
        return next(new AppError("user is not found",404))
     }
     const job = await jobModel.find({})
     if(!job){
        return next(new AppError("job is not found",404)) 
     }
     return res.status(200).json({ message: "success",job});
   })

//Get all Jobs for specific information.

   const getAllJobsWithSpecificCompany = catchError(async(req,res,next)=>{
    const User = await userModel.findById(req.user.id);
    if (!User) {
        return next(new AppError("user is not found",404))
     }
     const {companyName} = req.query;
     const company = await companyModel.findOne({companyName})
     console.log(company);
     if(!company){
        return next(new AppError("company is not found",404)) 
     }
     const jobs = await jobModel.find({addedBy:company.companyHR})
     if(!jobs.length > 0 )
        return next(new AppError("job is not found",404)) 
        return res.status(200).json({ message: "success",jobs});
   })

//Get all Jobs that match the following filters 

   const filterJobs = catchError(async(req,res,next)=>{
    const User = await userModel.findById(req.user.id);
    if (!User) {
        return next(new AppError("user is not found",404))
     }
    const {workingTime,jobLocation,seniorityLevel}= req.query
    if(workingTime){
    let job = await  jobModel.find({workingTime})
    if(job.length>0){
      return res.json({ message: "success", job });
      }
       else{
        return next(new AppError("job is not found",404))
    }}
    if(jobLocation){
      let job = await  jobModel.find({jobLocation})
    if(job.length>0){
      return res.json({ message: "success", job });
      }
       else{
        return next(new AppError("job is not found",404))
    }
    }
    if(seniorityLevel){
      let job = await  jobModel.find({seniorityLevel})
    if(job.length>0){
      return res.json({ message: "success", job });
      }
       else{
        return next(new AppError("job is not found",404))
    }
    }
    if(jobTitle){
        let job = await  jobModel.find({jobTitle})
      if(job.length>0){
        return res.json({ message: "success", job });
        }
         else{
            return next(new AppError("job is not found",404))
      }
      }
      if(technicalSkills){
        let job = await  jobModel.find({technicalSkills})
      if(job.length>0){
        return res.json({ message: "success", job });
        }
         else{
            return next(new AppError("job is not found",404))
      }
      }
   }
)




import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dcoti9wei',
    api_key: '233371724779657',
    api_secret: 'hPCH-8mPe73nGsiVtufBFf0Gsis' // Click 'View API Keys' above to copy your API secret
});


// Apply to Job.....


const applyjob = catchError(async(req,res,next)=>{
    let user = await userModel.findOne({_id:req.user.id,role:"User"});
    if (!user) {
        return next(new AppError("only user can apply to this jobs",403))
     }
     let job = await jobModel.findOne({_id:req.body.jobId});
     if(!job)
        return next(new AppError("job is not found",404))
     req.body.userId = req.user.id;
     cloudinary.uploader.upload(req.file.path,
        async function(error,result){
            req.body.userResume = result.secure_url
            let application = await applicationModel.create(req.body);
            return res.status(201).json({ message: "your application is submitted", application});
        }
    ) 
})



const getApplications = async(req,res)=>{
    let app = await applicationModel.find()
       res.json({message:"success",app})
   }






export{
    addjob,getApplications,updatejob,deletejob,getAllJobsWithCompanys,getAllJobsWithSpecificCompany,filterJobs,applyjob
}



