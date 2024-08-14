
import Joi from "joi"

const addJobVal = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required()
  });

  const updateJobVal = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    id:Joi.string().hex().length(24).required()

  });
  const deleteJobVal = Joi.object({
    id:Joi.string().hex().length(24).required()
  });
  const getAllJobsWithSpecificCompanyVal = Joi.object({
    companyName: Joi.string().required()
  });
  const filterJobsVal = Joi.object({
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    technicalSkills: Joi.array().items(Joi.string()),
    jobTitle: Joi.string()
  });
export{
    addJobVal,updateJobVal,deleteJobVal,getAllJobsWithSpecificCompanyVal,filterJobsVal
}