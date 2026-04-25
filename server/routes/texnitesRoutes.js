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
    copylink,
    evaluation,
 } from "../controllers/texnitesController.js";
import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";
import { isAdminUser } from "../middleware/texnitesAdminMiddleware.js";
import { adminPage,
    admineditmycard,
    admindeletemycard,
 } from "../controllers/texnitesAdminController.js";

 
 ///////////////////////////////////
//import  uploadMiddleware  from "../middleware/upload-middleware.js"
///import { uploadImageController } from "../controllers/texnitesImageController.js"
//////////////
const router = express.Router();

router.get("/", getHomePage);
router.get("/become-technician", becometechnician);

//--------------Technician UserAccount------------------//
router.get("/technician",authMiddleware, collabpage );
router.post("/technician",authMiddleware, submitTechnician);
router.get("/mycards", authMiddleware, mycardsnew);
router.post("/edit-card/:id", authMiddleware, editmycard);
router.delete("/delete-card/:id", authMiddleware,  deletemycard);
router.get("/profile",  authMiddleware,  profile);
router.post("/change-password",authMiddleware, profilechangepassword );
router.post("/delete-account", authMiddleware, profiledeleteaccount);

//--------------Technician WithoutAccount------------------//
router.get("/technicianwithoutaccount",collabpage1 );
router.post("/technicianwithoutaccount", submitTechnician1 );

//------------------AdminAccount---------------------------------//
router.get("/admin", authMiddleware, isAdminUser, adminPage);
router.post("/admin/edit/:id", authMiddleware, isAdminUser, admineditmycard);
router.delete("/admin/delete/:id", authMiddleware, isAdminUser, admindeletemycard);

//-------------------Image------------------------------//
//router.post('/upload', authMiddleware, uploadMiddleware.single('image'), uploadImageController ) 

/////////////////////////////////////////////////////////////////////

router.post("/submit", submitSearch);
router.post("/submitepikoinwnia", submitContact);
router.get("/simvoules", advice);
router.get("/terms",showterms);
router.get("/epikoinwnia",contactpage);

router.get('/search', copylink );

router.get("/evaluation",evaluation);




export default router;
