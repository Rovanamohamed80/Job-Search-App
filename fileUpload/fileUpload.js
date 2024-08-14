import multer from "multer"
import { v4 as uuidv4 } from 'uuid';

export const fileUpload=(fieldName)=>{
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
      },
      filename: (req, file, cb) => {
        cb(null,uuidv4() + "-" + file.originalname)
      }
})
function fileFilter (req, file, cb) {
   if(file.mimetype=="application/pdf"){
    cb(null, true)
   }else{
    cb(null, false)
    console.log("pdf only");
   } 
  }
const upload = multer({storage,fileFilter,limits:{
    fileSize:1*1024*1024,
}})

return upload.single(fieldName)
}