import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";



export const  uploadImageController = async(req, res) =>{
    try{
      //  console.log('ImageController');
         
       //check if file is missing in req object
       if(!req.file){
        return res.status(400).json({
            success :false,
            message : 'Files is required. Please upload an image'
        });
       }

       //upload to cloudinary
       const  {url, publicId} = await  uploadToCloudinary(req.file.path);

       //store the image url and the public id along with the uploaded user id in database
       //use the supabase const newUploadedImage  pass data  url, publiciId, req.userInfo.userId 
       
       res.status(201).json({
          success:true,
          message:'Image uploaded',
          url:url,
          publicId:publicId,
          userId: req.userInfo.userId
       });

    }catch(error){
        
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Something went wrong! Please try again!'
        });
    }
};