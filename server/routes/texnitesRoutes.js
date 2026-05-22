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
 } from "../controllers/texnitesController.js";
import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";
import { isAdminUser } from "../middleware/texnitesAdminMiddleware.js";
import { isTexnitisUser } from  "../middleware/texnitesUserMiddleware.js";
import {
   optionalAuthMiddleware
} from "../middleware/optionalAuthMiddleware.js";
import { adminPage,
    admineditmycard,
    admindeletemycard,
 } from "../controllers/texnitesAdminController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRolesMiddleware.js";
 
 ///////////////////////////////////
//import  uploadMiddleware  from "../middleware/upload-middleware.js"
///import { uploadImageController } from "../controllers/texnitesImageController.js"
//////////////
const router = express.Router();

router.get("/", getHomePage);
router.get("/become-technician", becometechnician);

//--------------Technician UserAccount------------------//
router.get("/technician",authMiddleware, isTexnitisUser,collabpage );
router.post("/technician",authMiddleware,isTexnitisUser, submitTechnician);
router.get("/mycards", authMiddleware, isTexnitisUser,mycardsnew);
router.post("/edit-card/:id", authMiddleware,isTexnitisUser, editmycard);
router.delete("/delete-card/:id", authMiddleware,isTexnitisUser,  deletemycard);
router.get("/profile",  authMiddleware, authorizeRoles("user", "guest"),  profile);
router.post("/change-password",authMiddleware, authorizeRoles("user", "guest"), profilechangepassword );
router.post("/delete-account", authMiddleware,  authorizeRoles("user", "guest"),profiledeleteaccount);

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

router.post("/submit", optionalAuthMiddleware, submitSearch);
router.post("/submitepikoinwnia", submitContact);
router.get("/simvoules", advice);
router.get("/terms",showterms);
router.get("/epikoinwnia",contactpage);

router.get('/search', copylink );




export default router;
