//import { resetpassword } from "../controllers/texnitesAuthController.js";
import supabase from "../database/db.js";

export const getAllTexnites = async () => {
  const { data, error } = await supabase
    .from("texnitestest")
    .select("*");

  if (error) throw error;

  return data;
};

export const searchTexnites = async (speciality, city, price) => {
  //console.log(speciality, " ", city, " ", price)
  let query =await supabase
    .from("texnitestest")
    .select("*")
    .eq("Eidikotites", speciality)
    .eq("Poli", city);

  // Future price filter
  if (price) {
   // query = query.lte("Timi", price);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};


export const createTechnician = async (technicianData) => {
  const { data, error } = await supabase
    .from("texnitestest")
    .insert([technicianData]);

  if (error) throw error;

  return data;
};


export const TechnicianWithAccount = async (rows) =>{
   
   const {  error } = await supabase
      .from("texnitestest")
      .insert(rows);

    if (error) {
     console.log(error);
    }

};

export const createAccountTechnician = async (username, hashedPassword) =>{
  

  const { data, error } = await supabase
      .from("texnitesUsers")
      .insert([
        {
          username: username,
          password: hashedPassword,
        },
      ])
      .select();

     if (error) {
      throw error;
    } 

  return data ;

 
};



export const checkExistingTechnician = async (username) =>{

  const { data: existingUser, error: checkError } = await supabase
      .from("texnitesUsers")
      .select("id") // only select what you need
      .eq("username", username)
      .maybeSingle(); // returns null if not found

    if (checkError) throw checkError;

    return existingUser;  

};



export const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from("texnitesUsers")
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




export const createTechnicianWithAccount = async (technicianData) => {
  const { data, error } = await supabase
    .from("texnitestest")
    .insert([technicianData]);
console.log(error);
  if (error) throw error;
  
  return data;
};


export const getMyTechnicianDataWithAccount = async (userId) => {
     
    const { data, error } = await supabase
      .from("texnitestest")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
      //console.log(data);
     
      //console.log(data[0]);
      return data;
  
};


export const updateMyTechnicianSpecificDataWithAccount = async (userId, id,updatedFields) => {

    const { error: updateError } = await supabase
      .from("texnitestest")
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", userId);

      return updateError;
  
};

export const getMyTechnicianSpecificDataWithAccount =async (userId, id) => {



    const { data ,  error} = await supabase
      .from("texnitestest")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;

    return data;  

};




export const updatemycard = async (userId, id,updatedFields) => {

    const { error: updateError } = await supabase
      .from("texnitestest")
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", userId);
      

      return updateError;
  
};

export  const   deletecard = async (userId,id) => {
  
   const { error } = await supabase
    .from("texnitestest")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);


  return error;

};


export const  resetpasswordcheckuser = async (email) =>{

const {  error } = await supabase
      .from("texnitesUsers")
      .select("*")
      .eq("username", email)
      .single();

      return error;


};

export const resetpasswordupdatepassword = async(email,password) =>{

    const { error: updateError } = await supabase
      .from("texnitesUsers")
      .update({ password: password })
      .eq("username", email);

       //if (updaterror) throw updaterror;

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
    .from("texnitestest")
    .delete()
    .eq("user_id",userId);*/

   const {error }= await supabase
  .from("texnitesUsers")
  .delete()
  .eq("id", userId);

    return error;
};

export const admingetallUsers = async (req, res) =>{

  try {
    const { data, error } = await supabase
      .from("texnitestest")
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