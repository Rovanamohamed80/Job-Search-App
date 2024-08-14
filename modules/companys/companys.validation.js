import Joi from "joi"

const addCompanyVal = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.number().integer().min(11).max(20).required(),
    companyEmail: Joi.string().email().required()
  });

  const updateCompanyVal = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.number().integer().min(11).max(20).required(),
    companyEmail: Joi.string().email().required(),
    id:Joi.string().hex().length(24).required()
  });
  const deleteVal = Joi.object({
    id:Joi.string().hex().length(24).required()
  });

  const getCompanyVal = Joi.object({
    id:Joi.string().hex().length(24).required()
  });
  const searchCompanyVal = Joi.object({
    companyName: Joi.string().required()
  });
  const getSpecificApplicationVal = Joi.object({
    id:Joi.string().hex().length(24).required()
  });

  
  export{
    addCompanyVal,updateCompanyVal,deleteVal,getCompanyVal,searchCompanyVal,getSpecificApplicationVal
  }


