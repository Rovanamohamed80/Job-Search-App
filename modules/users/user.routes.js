import { Router } from "express";
import {deleteSpecificuser, getRecoveryEmail, getSpecificuser, getuser, loginuser, requestPassword, resetPassword, signUp, updatePassword, updateSpecificuser } from "./user.controller.js";
import { checkEmail} from "../../middleware/checkEmail.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { deleteVal, getRecoveryEmailVal, getSpecificVal, getVal, newVal, requestVal, signInVal, signUpVal, updatePassVal, updateVal} from "./user.validation.js";

const userRouter =Router()

userRouter.post('/',validate(signUpVal),checkEmail,signUp)
userRouter.post('/reset/:id',validate(requestVal),verifyToken,requestPassword)
userRouter.post('/new/:id',validate(newVal),verifyToken,resetPassword)
userRouter.post('/signin',validate(signInVal),loginuser)
userRouter.put('/:id',validate(updateVal),verifyToken,updateSpecificuser)
userRouter.delete('/:id',validate(deleteVal),verifyToken,deleteSpecificuser)
userRouter.get('/:id',validate(getVal),verifyToken,getuser)
userRouter.get('/profileData/:id',validate(getSpecificVal),verifyToken,getSpecificuser)
userRouter.put('/updatePass/:id',validate(updatePassVal),verifyToken,updatePassword)
userRouter.get('/',validate(getRecoveryEmailVal),verifyToken,getRecoveryEmail)
export default userRouter