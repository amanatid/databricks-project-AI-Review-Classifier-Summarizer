import express from "express";
import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";
//import { isAdminUser } from "../middleware/texnitesAdminMiddleware.js";
import  uploadMiddleware  from "../middleware/upload-middleware.js";
import { uploadImageController } from "../controllers/texnitesImageController.js";

const router = express.Router();


//-------------------Image------------------------------//
router.post('/upload', authMiddleware, uploadMiddleware.single('image'), uploadImageController ) ;

    

export default router;
