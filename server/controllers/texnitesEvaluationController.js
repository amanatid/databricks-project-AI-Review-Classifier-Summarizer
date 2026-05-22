import { 
         existingreview,
         insertreview,
         getReviewsByTechnicianId ,
         getTechnicianById,
         updateTechnicianScore,
         infotechnicianById
        } from "../models/texnitesModelEvaluation.js";

import  { calculateScore } from  "../helpers/score.js"


////----------------Evaluation--------------------------------------///
export const evaluation = async (req, res) => {
      console.log('evaluattion');
      console.log('user',req.userInfo);
      const technicianId = req.params.id;
    //  const  guest_id = "d81d4fae-7dec-11d0-a765-00a0c91e6bf6" ; //req.userInfo.userId;

    //  console.log(technicianId);  
     

 res.render("evaluation", {
    technicianId,
    query: req.query
  });
};


export const submitReview = async (req, res) => {
  console.log('Hit  Submit Review endpoint......');
  try {
   
    const {
      reliability,
      consistency,
      quality,
      response,
      price,
      completed,
      days,
      comment
    } = req.body;

    //console.log(req.body);

    //---------------- VALIDATION ---------------- //

    const values = [reliability, consistency, quality, response, price];

    if (values.some(v => v < 1 || v > 5)) {
      return res.status(400).json({ message: "Invalid rating values" });
    }

    // ---------------- CHECK UNIQUE ---------------- //

    const { userId } = req.userInfo;
    
   // console.log(userId); 
    const  guest_id   =  userId;  // of the guest  user 
    const technicianId = req.params.id;
    //Here  we check  if the  user has already   evaluated the  technician........
    const  existing = await existingreview(guest_id , technicianId);
    if (existing) {
     /* return res.status(400).json({
        message: "Έχετε ήδη αξιολογήσει αυτόν τον τεχνίτη"
      });*/
     return res.redirect(
   `/evaluation/${technicianId}?error=already-reviewed`
  );
    }

    // ---------------- SOFT VERIFICATION ---------------- //

    const verified = false; // 🔥 για τώρα

    // ---------------- INSERT ---------------- //
      //console.log('Insert  Review');
     await insertreview(guest_id, technicianId,reliability, consistency,
                                       quality, response, price,completed, days,
                                       comment,verified);
     

     // 🧠 GET ALL REVIEWS
    const reviews = await getReviewsByTechnicianId(technicianId);

    // 🧠 GET TECHNICIAN
    const technician = await getTechnicianById(technicianId);

    // 🧠 CALCULATE SCORE
    const score = calculateScore(reviews, technician.projects || 0);



    // 💾 UPDATE SCORE
    await updateTechnicianScore(technicianId, score);
                                    
 //   console.log("Score=",score);

  // SUCCESS RESPONSE
   return res.redirect(`/evaluatedtechnician/${technicianId}?success=1`); 
 /*  res.json({
    success:true,
    message:'Review  Submitted! '
   })*/

  } catch (err) {
    console.error(err);
   const technicianId = req.params.id; 
   return res.redirect(`/evaluation/${technicianId}?error=server`);
  }
}; 


export const getEvaluatedTechnicianPage = async (req, res) => {
  try {
    const technicianId = req.params.id;

    // 🔹 get technician (score)
    const technician = await getTechnicianById(technicianId);

     //console.log(technician);
     const infotechnician =  await infotechnicianById(technicianId ) 
     console.log(infotechnician);
    // 🔹 get reviews
    const reviews = await getReviewsByTechnicianId(technicianId);

    res.render("evaluatedtechnician", {
      technician,
      infotechnician,
      reviews,
      query: req.query
    });

  } catch (err) {
    console.error(err);
    res.send("Error loading technician");
  }
};
//-------------------------End of Evaluation-----------------------------///
