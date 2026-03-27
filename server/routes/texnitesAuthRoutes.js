import express from "express";
import { createaccount, 
         loginUser, 
         registerUser,
         loginaccount, 
         logoutUser,
        forgotpassword, 
        resetpassword } 
        from "../controllers/texnitesAuthController.js";
//import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";


const router = express.Router();

router.get("/register", createaccount);
router.post("/register", registerUser);
router.get("/login", loginaccount);
router.post("/login",loginUser);
router.get("/logout", logoutUser);
router.get("/forgot-password", forgotpassword);
router.post("/forgotpassword",resetpassword);



export default router;
