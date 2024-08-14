import Joi from "joi"

const signUpVal =Joi.object({
    firstName:Joi.string().min(2).max(20).required(),
    lastName:Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    recoveryEmail:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    DOB:Joi.date().required(),
    phoneNumber:Joi.number().required(),
    role:Joi.string().valid('User', 'Company_HR').default('User'),
    status: Joi.string().valid('online', 'offline').default('offline')

})
const signInVal =Joi.object({
    userName:Joi.string().min(2).max(20),
    email:Joi.string().email(),
    recoveryEmail:Joi.string().email(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),

})
const updateVal =Joi.object({
    firstName:Joi.string().min(2).max(20),
    lastName:Joi.string().min(2).max(20),
    email:Joi.string().email(),
    recoveryEmail:Joi.string().email(),
    DOB:Joi.date(),
    phoneNumber:Joi.number(),
    id:Joi.string().hex().length(24).required()
})

const deleteVal =Joi.object({

    id:Joi.string().hex().length(24).required()
})
const getVal =Joi.object({

    id:Joi.string().hex().length(24).required()
})
const getSpecificVal =Joi.object({

    id:Joi.string().hex().length(24).required()
})
const updatePassVal =Joi.object({
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    id:Joi.string().hex().length(24).required()
})


const requestVal =Joi.object({
    recoveryEmail:Joi.string().email().required(),
    id:Joi.string().hex().length(24).required()
})

const newVal =Joi.object({
    recoveryEmail:Joi.string().email().required(),
    newPassword:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    id:Joi.string().hex().length(24).required(),
    OTPCode: Joi.string().optional()
})

const getRecoveryEmailVal =Joi.object({
    recoveryEmail:Joi.string().email().required()
})

export{
    signUpVal,signInVal,updateVal,deleteVal,getVal,getSpecificVal,updatePassVal,newVal,requestVal,getRecoveryEmailVal
}