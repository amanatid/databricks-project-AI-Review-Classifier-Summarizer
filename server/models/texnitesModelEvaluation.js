//import { resetpassword } from "../controllers/texnitesAuthController.js";
import supabase from "../database/db.js";
const tablename= "texnitestest1_duplicate";


export  const  existingreview = async(guest_id, technicianId) =>{
  console.log(guest_id,technicianId);
  const { data: existing,error } = await supabase
      .from("reviews")
      .select("id")
      .eq("guest_id", guest_id)
      .eq("technician_id", technicianId)
      .single();
  
  if (error) {
    // Specifically check if the error is just "No rows found"
    // This is common for a "check if exists" function
    if (error.code === 'PGRST116') {
     //  console.log("No existing review found.");
       return null; 
    }

    // If it's a real database error, log it and throw
    console.error("Supabase Error:", error.message);
    throw new Error(error.message);
  }   

  return existing;    

}




export  const insertreview = async(guestId, technicianId,
                                   reliability, consistency,
                                   quality, response, price,
                                   completed, days, comment,
                                   verified) =>{

   const { error } = await supabase
      .from("reviews")
      .insert({
        guest_id: guestId,
        technician_id: technicianId,
        reliability,
        consistency,
        quality,
        response,
        price,
        completed: completed === "true",
        days: parseInt(days) || null,
        comment,

        verified
      });

   if (error) throw error;   

}


export const getReviewsByTechnicianId  = async (technicianId) => {

  console.log('technicianid',technicianId);
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("technician_id", technicianId);
  //console.log(error);
  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }

  return data;
};

export const getTechnicianById = async (technicianId) => {
  const { data, error } = await supabase
    .from("texnitesall")
    .select("*")
    .eq("id", technicianId)
    .single();

  if (error) {
    console.error("Error fetching technician:", error);
    throw error;
  }

  return data;
};



export const infotechnicianById = async (technicianId) => {
  const { data, error } = await supabase
    .from(tablename)
    .select("*")
    .eq("technician_id", technicianId)
    .single();

  if (error) {
    console.error("Error fetching technician:", error);
    throw error;
  }

  return data;
};

export const updateTechnicianScore = async (technicianId, score) => {
  const { data, error } = await supabase
    .from("texnitesall")
    .update({ score })
    .eq("id", technicianId);

  if (error) {
    console.error("Error updating score:", error);
    throw error;
  }

  return data;
};