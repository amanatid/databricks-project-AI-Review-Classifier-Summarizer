import express from "express";
import { createaccount, 
         loginUser, 
         registerUser,
         loginaccount, 
         logoutUser,
         forgotpassword, 
         forgetpasswordtoken,
         resetpasswordtoken,
         resetnewpassowrdnulltoken 
        } 
        from "../controllers/texnitesAuthController.js";



const router = express.Router();

router.get("/register", createaccount);
router.post("/register", registerUser);
router.get("/login", loginaccount);
router.post("/login",loginUser);
router.get("/logout", logoutUser);

router.get("/forgot-password", forgotpassword);
router.post("/forgotpassword", forgetpasswordtoken );
router.get("/resetpassword/:token", resetpasswordtoken);
router.post("/resetpassword/:token",  resetnewpassowrdnulltoken );
//////////////////////////////////////////////////////////////






export default router;
