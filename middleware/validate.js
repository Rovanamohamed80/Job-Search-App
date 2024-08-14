import { signUpVal } from "../modules/users/user.validation.js"




export const validate=(schema)=>{
    return(req,res,next) =>{
        let {error} = schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
            if(!error){
                next()
            }else{
                let errMsgs =[]
                error.details.forEach((err)=>{
                    errMsgs.push(err.message)
                })
                res.json(errMsgs)
            }
        
    }
}