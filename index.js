process.on('uncaughtException',()=>{
    console.log('error in code');
    
})
import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import userRouter from './modules/users/user.routes.js'
import companyRouter from './modules/companys/company.routes.js'
import jobRouter from './modules/jobs/job.routes.js'
import applicationModel from './db/models/application.model.js'
import { fileUpload } from './fileUpload/fileUpload.js'
import { verifyToken } from './middleware/verifyToken.js'
import userModel from './db/models/user.model.js'
import jobModel from './db/models/job.model.js'
import { AppError } from './utili/appError.js'
import { globalError } from './middleware/globalError.js'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config()


cloudinary.config({
    cloud_name: 'dcoti9wei',
    api_key: '233371724779657',
    api_secret: 'hPCH-8mPe73nGsiVtufBFf0Gsis' // Click 'View API Keys' above to copy your API secret
});
    
 

const app = express()
const port = process.env.BORT
app.use(express.json())
dbConnection
app.use('/users',userRouter)
app.use('/companys',companyRouter)
app.use('/jobs',jobRouter)
app.use('/uploads',express.static('uploads'))
app.use(verifyToken)



app.use('*',(req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})

app.use(globalError)
process.on('unhandledRejection',(err)=>{
    console.log('error',err);
    
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))