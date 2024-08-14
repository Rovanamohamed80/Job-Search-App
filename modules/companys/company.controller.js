import applicationModel from "../../db/models/application.model.js";
import companyModel from "../../db/models/company.model.js"
import jobModel from "../../db/models/job.model.js";
import userModel from "../../db/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utili/appError.js";

//Add company ....

const addCompany = catchError(async (req,res,next)=>{
    const {companyName,description,industry,address,numberOfEmployees,companyEmail} = req.body;
    let user = await userModel.findOne({_id:req.user.id,role:"Company_HR"});
    if (!user) {
        return next(new AppError("You have no access to add company's account",403))
     }
     req.body.companyHR = req.user.id;
    const companyHR = req.body.companyHR
    let companys = await companyModel.findOne({companyName:req.body.companyName},{companyEmail:req.body.companyEmail});
    if(companys){
        return next(new AppError("this companyName or Email is already exists",409))
    }
     let comp = await companyModel.create({companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR});
     return res.status(200).json({ message: "the company added successfully",comp });
})


//update company data....

const updatecompany = catchError(async(req,res,next)=>{
    const {companyName,description,industry,address,numberOfEmployees,companyEmail} = req.body;
       const User = await userModel.findById(req.params.id);
       if (!User) {
        return next(new AppError("User is not found",404))
        }
       if (req.params.id != req.user.id || User.role != 'Company_HR') {
         return next(new AppError("You have no access to update this account's information",403))
        }
        let companys = await companyModel.findOne({ $or: [{ companyName }, { companyEmail }], companyHR: { $ne: req.user.id }});
        if(companys){
            return res.status(404).json({ message: "this companyName or Email is already exists" });
        }else{
       let company = await companyModel.findOne({companyHR:req.params.id});
       if(company){
        let comp = await companyModel.updateOne({ _id: company._id },{companyName,description,industry,address,numberOfEmployees,companyEmail})
        return res.status(200).json({ message: "the company added successfully" ,comp});}
       else{
        return next(new AppError("company is not found",404))
       }}
   })

//delete company data.....

const deletecompany = catchError(async(req,res,next)=>{
    const User = await userModel.findById(req.params.id);
    if (!User) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id || User.role != 'Company_HR') {
        return next(new AppError("You have no access to delete this account's information",403))
     }
    let company = await companyModel.findOne({companyHR:req.params.id});
    if(company){
     let comp = await companyModel.deleteOne({ _id: company._id })
     return res.status(200).json({ message: "the company deleted successfully" ,comp});}
    else{
        return next(new AppError("company is not found",404))
    }
 })

//Get company data .....

const getCompany = catchError(async(req,res,next)=>{
    let user = await userModel.findOne({_id:req.user.id,role:"Company_HR"});
    if (!user) {
        return next(new AppError("You have no access to get company's account",403))
     }
     let company = await companyModel.findOne({_id:req.params.id})
     if (!company){
        return next(new AppError("company is not found",404))
     }
     let job = await jobModel.find({addedBy:company.companyHR})
     if(job.length > 0)
     return res.status(200).json({ message: "jobs got successfully",job });
     return next(new AppError("jobs is not found",404))

})

//search company data 

const searchCompany = catchError(async(req,res,next)=>{
    let user = await userModel.findOne({_id:req.user.id});
    if (!user) {
        return next(new AppError("User is not found",404))
     }
     let company = await companyModel.findOne({companyName:req.body.companyName})
     if(!company)
        return next(new AppError("company is not found",404))
     return res.status(200).json({ message: "company got successfully",company });

})

//Get all applications for specific Job....

const getSpecificApplication = catchError(async (req,res,next)=>{
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new AppError("User is not found",404))
     }
    if (req.params.id != req.user.id || user.role != 'Company_HR') {
        return next(new AppError("You have no access to get company's account",403))
     }

     const [job] = await jobModel.find({addedBy:req.params.id})
     if(!job)
        return next(new AppError("company is not found",404))
     if(job.addedBy == req.user.id){
       const application = await applicationModel.find({jobId:job._id}).populate("jobId")
       if(!application)
        return next(new AppError("application is not found",404))
       return res.status(200).json({ message: "success" ,application});}
        
})








export{
    addCompany,updatecompany,deletecompany,getCompany,searchCompany,getSpecificApplication
}



















