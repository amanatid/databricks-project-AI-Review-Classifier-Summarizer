import { admingetallTechnicians,
         adminupdatemycard,
         adminupdateusername,
         adminupdatepassword,
         adminCreateUser,
         admindeletecard, 
        } from "../models/texnitesModel.js";

import { professionMap, optionsMap} from "../public/data/professionMap.js";
import bcrypt from "bcryptjs"; 
import { greekMunicipalities } from "../public/data/greekMunicipalities.js";



export const adminPage = async (req, res) => {
   const cards=  await admingetallTechnicians();
   //const  users = await admingetallUsers();

   res.render("admin-dashboard.ejs",{
     cards: cards,  
     professionMap:professionMap,
     optionsMap:optionsMap,
     greekMunicipalities:greekMunicipalities,
  });
  /*res.json({
    message: "Welcome to the admin page",
  });*/
};


export const admineditmycard =  async  (req, res, next) => {
// console.log('Updated');
   
     try {
 
     const id = req.params.id;
    
     // user comes from authMiddleware
      //  const {  userId } = req.userInfo;
      let newuserid = null; 
     
      const {idtexnitesusers, username, password} = req.body;
      //console.log( "Id-username-password", username, password);

      if( idtexnitesusers) {
        //console.log('username exists with id=',idtexnitesusers) ;
        if (!username){
            newuserid = null;
          
        }
        // 🔹 Update username
        await adminupdateusername(idtexnitesusers, username);

        // 🔹 Password logic
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await adminupdatepassword(idtexnitesusers, hashedPassword);
        }
         newuserid = idtexnitesusers;
        
      }
      else{
       //console.log('create username') ;
        

        if( username && password) { 
         const hashedPassword = await bcrypt.hash(password, 10);
         const newuser = await adminCreateUser(username,hashedPassword);      
         newuserid =newuser[0].id; 
        }
      }
      

   
     const {
       Onoma,
       Epitheto,
       Eidikotites,
       Perifereia,
       Nomos,
       Poli,
       Timi,
       Prosthetes,
       Diathesimotita,
       Phone,
       Epimerous1,
     } = req.body;
    
     const Eidikotita = professionMap[Eidikotites];
    
     const updatedFields = {
       Onoma,
       Epitheto,
       Eidikotites,
       Eidikotita,
       Perifereia,
       Nomos,
       Poli,
       Timi:parseInt(Timi),
       Prosthetes,
       Diathesimotita,
       Phone,
       user_id:newuserid,
       Epimerous1: Array.isArray(Epimerous1) && Epimerous1.length > 0
                  ? Epimerous1.join(",")
                  : null
     };
    // console.log(id , updatedFields)
     const error = await adminupdatemycard(id, updatedFields);
 
     if (error) {
       return res.json({
         success: false,
         message: error.message
       });
     }
 
   //  res.json({ success: true });
     res.redirect("/admin");
 
   } catch (err) {
      next(err);
      console.error(err);
 
     res.json({
       success: false,
       message: "Server error"
     });
 
   }
 
 
};


export const admindeletemycard = async (req,res)=>{
    
 try{   
     //const { userId } = req.userInfo;

     const id = req.params.id; 

     console.log('admindeletecard id=',id); 
     await admindeletecard(id);
    
    res.redirect("/admin");
  } 
  catch(error){
           res.json({success: false, message: "Server error"});  
        }     

};    
