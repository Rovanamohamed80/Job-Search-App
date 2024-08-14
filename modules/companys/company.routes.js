import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany,deletecompany, getCompany, getSpecificApplication, searchCompany, updatecompany } from "./company.controller.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCompanyVal,deleteVal, getCompanyVal, getSpecificApplicationVal, searchCompanyVal, updateCompanyVal } from "./companys.validation.js";


const companyRouter =Router()

companyRouter.post('/',validate(addCompanyVal),verifyToken,addCompany)
companyRouter.put('/:id',validate(updateCompanyVal),verifyToken,updatecompany)
companyRouter.delete('/:id',validate(deleteVal),verifyToken,deletecompany)
companyRouter.get('/:id',validate(getCompanyVal),verifyToken,getCompany)
companyRouter.get('/',validate(searchCompanyVal),verifyToken,searchCompany)
companyRouter.get('/app/:id',validate(getSpecificApplicationVal),verifyToken,getSpecificApplication)
export default companyRouter