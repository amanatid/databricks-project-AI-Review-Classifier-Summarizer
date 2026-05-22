//import { resetpassword } from "../controllers/texnitesAuthController.js";
import supabase from "../database/db.js";
const tablename= "texnitesGuests";



export const checkExistingGuest = async (username) =>{

  const { data: existingUser, error: checkError } = await supabase
      .from(tablename)
      .select("id") // only select what you need
      .eq("username", username)
      .maybeSingle(); // returns null if not found

    if (checkError) throw checkError;

    return existingUser;  

};



export const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from(tablename)
    .select("*")
    .eq("username", username)
    .maybeSingle(); // returns null if not found
  
   
  if (error) {
    throw error;
  }

  if (!data) {
    return null; // user does NOT exist
  }

  return data; // user exists
};




export const createAccountGuest = async (username, hashedPassword, Onoma, Epitheto, Phone, Poli) => {
  try {
   
   

    // Insert into texnitesUsers
    const {  data: userData, error: userError } = await supabase
      .from("texnitesUsers")
      .insert([
        {
          username: username,
          password: hashedPassword,
          role: "guest"
        },
      ])
      .select();

    // If the second insert fails, return false
    if (userError) {
      console.error("Error inserting into texnitesUsers:", userError.message);
      return false;
    }
     
    const userId = userData[0].id;
     // Insert into texnitesGuests
    const { error: guestError } = await supabase
      .from("texnitesGuests")
      .insert([
        { 
          id: userId,  
          username: username,
          password: hashedPassword,
          Onoma: Onoma,
          Epitheto: Epitheto,
          Phone: Phone,
          Poli: Poli,
        },
      ])
      .select();

    // If the first insert fails, we stop and return false
    if (guestError) {
      console.error("Error inserting into texnitesGuests:", guestError.message);
      return false;
    }




    // If we reached here, both inserts were successful
    return true;

  } catch (error) {
    // This catches unexpected errors (network issues, syntax errors, etc.)
    console.error("Unexpected error creating account:", error);
    return false;
  }
};


export const getMyTechnicianDataWithAccount = async (userId) => {
     
    const { data, error } = await supabase
      .from(tablename)
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
      //console.log(data);
     
      //console.log(data[0]);
      return data;
  
};


export const updateMyTechnicianSpecificDataWithAccount = async (userId, id,updatedFields) => {

    const { error: updateError } = await supabase
      .from(tablename)
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", userId);

      return updateError;
  
};

export const getMyTechnicianSpecificDataWithAccount =async (userId, id) => {



    const { data ,  error} = await supabase
      .from(tablename)
      .select("*")
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;

    return data;  

};




export const updatemycard = async (userId, id,updatedFields) => {

    const { error: updateError } = await supabase
      .from(tablename)
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", userId);
      
      console.log(updateError);

      return updateError;
  
};

export  const   deletecard = async (userId,id) => {
  
   const { error } = await supabase
    .from(tablename)
    .delete()
    .eq("id", id)
    .eq("user_id", userId);


  return error;

};



export const profilemodelcurrentpassword = async(userId)=>{
 
      console.log(userId) ;
      const {data:user ,error:error} = await supabase
      .from("texnitesUsers")
      .select("*")
      .eq("id",userId);
       
      console.log(user) ;
      if (error) throw error; 
     
      return user;

};

export const profilemodelchangepassword = async(hashed,userId) =>{

      const{ error} = await supabase
          .from("texnitesUsers")
          .update({password:hashed})
          .eq("id",userId);

      if (error) throw error; 
};

export const profilemodeldeleteaccount = async(userId) =>{

    
   /* const {error }=  await supabase
    .from("texnitesUsers")
    .delete()
    .eq("id",userId);

     const {error:error1 }=  await supabase
    .from(tablename)
    .delete()
    .eq("user_id",userId);*/

   const {error }= await supabase
  .from("texnitesUsers")
  .delete()
  .eq("id", userId);

    return error;
};

export const admingetallTechnicians = async (req, res) =>{

  try {
    const { data, error } = await supabase
      .from(tablename)
      .select(`
        *,
        texnitesUsers (
          id,
          username,
          password
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data;

  } catch (err) {
    res.status(500).send(err.message);
  }
};



export const admingetallUsers = async (req, res) =>{

  try {
    const { data, error } = await supabase
      .from("texnitesUsers")
      .select(`
        *,
        texnitesUsers (
          id,
          username
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data;

  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const adminupdatemycard =  async (id,updatedFields) => {

    const { error: updateError } = await supabase
      .from(tablename)
      .update(updatedFields)
      .eq("id", id);
   
      
     // console.log(updateError);

      return updateError;
  
};



export const adminupdateusername = async (idtexnitesusers, username) => {
  try {
    const { error } = await supabase
      .from("texnitesUsers")
      .update({ username })
      .eq("id", idtexnitesusers);

    if (error) throw error;

    return true;

  } catch (err) {
    console.error(err.message);
    
    return false;
  }
};


export const adminupdatepassword = async (idtexnitesusers, password) => {
  try {
    const { error } = await supabase
      .from("texnitesUsers")
      .update({ password })
      .eq("id", idtexnitesusers);

    if (error) throw error;

    return true;

  } catch (err) {
    console.error(err.message);
    return false;
  }
};


export const adminCreateUser = async (username, password) => {
  try {
    const { data, error } = await supabase
      .from("texnitesUsers")
      .insert([
        {
          username: username,
          password: password
        }
      ])
      .select(); // returns inserted row

    if (error) throw error;

    return data;

  } catch (err) {
    console.error("Possible Server Error or dublicate email ",err.message);
    return null;
  }
};


export const admindeletecard = async(id) =>{
   
   const {error }= await supabase
  .from(tablename)
  .delete()
  .eq("id", id);
 
  return error;
};



export const tokenfinduserbyusername = async(email) =>{
   
  
const {data:user} = await supabase
.from("texnitesUsers")
.select("*")
.eq("username",email)
.single();

 
  return user;
};


export const resettokenexpires = async(id, token, expires)=>{

  await supabase
.from("texnitesUsers")
.update({
reset_token:token,
reset_expires:expires
})
.eq("id", id);

};




export const tokenfinduserbytoken = async(token) =>{
 
  //console.log('inside tokenfinduserbytoken');
 const { data: user, error } = await supabase
      .from("texnitesUsers")
      .select("*")
      .eq("reset_token", token)
      .single();

  console.log(error);    
  return user;    
};



export const tokenpasswordtokenupdate = async(hashedPassword,id) =>{
 
  // 💾 Update password + clear token
    await supabase
      .from("texnitesUsers")
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_expires: null
      })
      .eq("id", id);

};

export  const  pagination = async(from,to, sortOrder,sortBy)=>{
     console.log('querydata')
     console.log(from,to,sortOrder,sortBy);
  // Execute Query
    const { data: datapaginated,count:count, error } = await supabase
      .from(tablename)
      .select("*", { count: 'exact' }) // 'exact' is needed to get the total count for totalPages
      .order(sortBy, { ascending: sortOrder })
      .range(from, to);

  
      if (error) throw error;
      console.log(error);
      console.log(count);

      return {datapaginated, count};



}


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
  console.log(error);
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
    .from("texnitestest1")
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