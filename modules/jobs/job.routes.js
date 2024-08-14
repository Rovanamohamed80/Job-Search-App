import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addjob,applyjob,deletejob, filterJobs, getAllJobsWithCompanys, getAllJobsWithSpecificCompany, getApplications, updatejob} from "./job.controller.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addJobVal, deleteJobVal, filterJobsVal, getAllJobsWithSpecificCompanyVal, updateJobVal } from "./jobs.validation.js";


const jobRouter =Router()

jobRouter.post('/',validate(addJobVal),verifyToken,addjob)
jobRouter.get('/applications',getApplications)
jobRouter.put('/:id',validate(updateJobVal),verifyToken,updatejob)
jobRouter.delete('/:id',validate(deleteJobVal),verifyToken,deletejob)
jobRouter.get('/',verifyToken,getAllJobsWithCompanys)
jobRouter.get('/specific',validate(getAllJobsWithSpecificCompanyVal),verifyToken,getAllJobsWithSpecificCompany)
jobRouter.get('/filter',validate(filterJobsVal),verifyToken,filterJobs)
jobRouter.post('/app1/',verifyToken,fileUpload('userResume'),applyjob);
export default jobRouter