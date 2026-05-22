import express from "express";
import { 
    evaluation,
    submitReview,
    getEvaluatedTechnicianPage,
 } from "../controllers/texnitesEvaluationController.js";
import { authMiddleware } from "../middleware/texnitesAuthMiddleware.js";
import { isGuestUser } from "../middleware/texnitesGuestMiddleware.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

 
const router = express.Router();

//////------------Guest Submit Review-----------------------/
/* We have to build Guest  MiddleWare */
router.get("/evaluation/:id",authMiddleware, isGuestUser, evaluation);
router.post("/evaluation/:id", authMiddleware, isGuestUser,  submitReview)
router.get("/evaluatedtechnician/:id", getEvaluatedTechnicianPage);




export default router;
