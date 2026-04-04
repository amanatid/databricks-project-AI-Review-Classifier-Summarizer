import express from "express";
import { 
    getHomePage, 
    submitSearch,
    submitContact,
    submitTechnician,
    advice,
    showterms,
    collabpage,
    contactpage,
    mycardsnew,
    editmycard,
    deletemycard,
    collabpage1,
    becometechnician,
    profile,
    profilechangepassword,
    profiledeleteaccount,
    submitTechnician1,
    adminPage,
    admineditmycard,
    admindeletemycard,
 } from "../controllers/texnitesController.js";
import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";
import { isAdminUser } from "../middleware/texnitesAdminMiddleware.js";


const router = express.Router();

router.get("/", getHomePage);

router.get("/become-technician", becometechnician);

router.get("/technician",authMiddleware, collabpage );
router.get("/admin", authMiddleware, isAdminUser, adminPage);

router.post("/technician",authMiddleware, submitTechnician);
router.get("/mycards", authMiddleware, mycardsnew);
//////////////////////////////////////////////////////////
router.get("/technicianwithoutaccount",collabpage1 );
router.post("/technicianwithoutaccount", submitTechnician1 );
/////////////////////////////////////////////////////////////////////
router.post("/edit-card/:id", authMiddleware, editmycard);
router.delete("/delete-card/:id", authMiddleware,  deletemycard);
//////////////////////////////////////////////////////////////////////

router.post("/admin/edit/:id", authMiddleware, isAdminUser, admineditmycard);
router.delete("/admin/delete/:id", authMiddleware, isAdminUser, admindeletemycard);

 

router.get("/profile",  authMiddleware,  profile);
router.post("/change-password",authMiddleware, profilechangepassword );
router.post("/delete-account", authMiddleware, profiledeleteaccount);
/////////////////////////////////////////////////////////////////////

router.post("/submit", submitSearch);
router.post("/submitepikoinwnia", submitContact);
router.get("/simvoules", advice);
router.get("/terms",showterms);
router.get("/epikoinwnia",contactpage);



export default router;
