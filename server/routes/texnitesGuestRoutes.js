import express from "express";

import { createguestaccount,
         registerGuestAccount,
        } 
        from "../controllers/texnitesGuestController.js";



const router = express.Router();

router.get("/createguestaccount", createguestaccount);
router.post("/createguestaccount",registerGuestAccount);


export default router;