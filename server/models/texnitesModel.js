//import { resetpassword } from "../controllers/texnitesAuthController.js";
import supabase from "../database/db.js";

export const getAllTexnites = async () => {
  const { data, error } = await supabase
    .from("texnitestest")
    .select("*");

  if (error) throw error;

  return data;
};

export const searchTexnites = async (speciality,  region, prefecture, city) => {
 
  let query =await supabase
    .from("texnitestest")
    .select("*")
    .eq("Eidikotites", speciality)
    .eq("Perifereia", region)
    .eq("Nomos", prefecture)
    .eq("Poli", city);
 
  const { data, error } = await query;

  if (error) throw error;
  return data;

};

export const searchTexnitesCity = async (speciality,  city ) => {
 
  let query =await supabase
    .from("texnitestest")
    .select("*")
    .eq("Eidikotites", speciality)
    .eq("Poli", city);

  const { data, error } = await query;
 
  if (error) throw error;

  return data;
};



export const copydatalink  = async  (speciality,  region, prefecture, city) => {

  
  const { data, error } = await supabase
    .from('texnitestest')
    .select('*')
    .eq('Eidikotites', speciality)
    .eq('Perifereia', region)
    .eq('Nomos', prefecture)
    .eq('Poli', city);

    
  if (error) throw error;

  return data;
  
}


export const copydatalinkcity  = async  (speciality, city) => {

  
  const { data, error } = await supabase
    .from('texnitestest')
    .select('*')
    .eq('Eidikotites', speciality)
    .eq('Poli', city);

    
  if (error) throw error;

  return data;
  
}

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
      
      console.log(updateError);

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

export const admingetallTechnicians = async (req, res) =>{

  try {
    const { data, error } = await supabase
      .from("texnitestest")
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
      .from("texnitestest")
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
  .from("texnitestest")
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

}




export const tokenfinduserbytoken = async(token) =>{
 
  console.log('inside tokenfinduserbytoken')
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


