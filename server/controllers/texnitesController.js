import { getAllTexnites, 
         searchTexnites,
         profilemodelchangepassword, 
         profilemodelcurrentpassword,
         TechnicianWithAccount, 
         getMyTechnicianDataWithAccount,
         updatemycard, deletecard,
         profilemodeldeleteaccount
        } from "../models/texnitesModel.js";
import { sendContactEmail } from "../services/emailService.js";
//import { TechnicianWithAccount } from "../models/texnitesModel.js";
//import { getMyTechnicianDataWithAccount } from "../models/texnitesModel.js";
//import { updatemycard, deletecard } from "../models/texnitesModel.js";
import { professionMap, optionsMap} from "../public/data/professionMap.js";
import bcrypt from "bcryptjs"; 

export const getHomePage = async (req, res, next) => {
  try {
    const data = await getAllTexnites();

    const uniquePoli = [...new Set(data.map(item => item.Poli))];

    res.render("index.ejs", {
      data,
      uniquePoli,
      optionsMap:optionsMap
    });

  } catch (error) {
    next(error);
  }
};



export const submitSearch = async (req, res, next) => {
  try {
    const { speciality, city } = req.body;
    let price = req.body.price || 1000000; // default high value
   
    // Validation
    if (!speciality || !city) {
      return res.status(400).json({
        message: "Παρακαλώ συμπληρώστε όλα τα πεδία."
      });
    }

    const data = await searchTexnites(speciality, city, price);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Μη Διαθέσιμα Δεδομένα",
        data: []
      });
    }

    res.json({
      message: null,
      data
    });

  } catch (error) {
    next(error);
  }
};


export const submitContact = async (req, res) => {
  try {
    const { name, email, text } = req.body;

    if (!name || !email || !text) {
      return res.render("epikoinwnia.ejs", {
        message: "Παρακαλώ συμπληρώστε όλα τα πεδία.",
        submitbutton: true,
      });
    }

    await sendContactEmail({ name, email, text });

    res.render("epikoinwnia.ejs", {
      message: "Τα στοιχεία σας στάλθηκαν επιτυχώς!",
      submitbutton: true,
    });

  } catch (error) {
   // console.error(error);
      next(error);
    res.render("epikoinwnia.ejs", {
      message: "Error sending email.",
      submitbutton: true,
    });
  }
};



export const submitTechnician = async (req, res, next) => {
  try {
   // const { username, userId } = req.userInfo;
    const created_at = new Date(); 
    const { Onoma, Epitheto, Eidikotites,Epimerous,services } = req.body;


   // console.log("reqbody=", req.body)
  //console.dir(req.body, { depth: null });
    
    const user_id = req.userInfo.userId; // from JWT middleware
    const Eidikotita = professionMap[Eidikotites];
    //console.log(Eidikotita)
    // Normalize Epimerous to always be array
   const normalizedServices = services.map(service => ({
      ...service,
      Epimerous: Array.isArray(service.Epimerous)
        ? service.Epimerous
        : service.Epimerous
          ? [service.Epimerous]
          : []
    }));

       
    const EpimerousArray = Array.isArray(Epimerous)
      ? Epimerous
      : Epimerous ? [Epimerous] : [];

    const Epimerous1 = EpimerousArray.join(', ');

    


    // Prepare rows for insertion
    const rows = normalizedServices.map(service => ({
      created_at: created_at ,
      Onoma,
      Epitheto,
      Epimerous1:Epimerous1,
      Eidikotita: Eidikotita,
      Perifereia:service.Perifereia,
      Nomos:service.Nomos,
      Poli: service.Poli,
      Eidikotites: Eidikotites,
      Phone: service.Phone,
      Prosthetes: service.Prosthetes,
      Diathesimotita: service.Diathesimotita,
      Timi: parseInt(service.Timi),
      user_id
    }));

  //console.dir(rows, { depth: null });

   await TechnicianWithAccount(rows);

     

  res.render("technicianform.ejs", {
      message: "Τα στοιχεία σας στάλθηκαν επιτυχώς! H Καταχώρηση σας είναι Δωρεάν!",
      submitbutton: true,
      optionsMap:optionsMap
    });

  } catch (error) {
    next(error);
  }
};






export const submitTechnician1 = async (req, res, next) => {
  try {
    console.log("Post Technician without Account");
    const created_at = new Date(); 
    const { Onoma, Epitheto, Eidikotites,Epimerous,services } = req.body;


   // console.log("reqbody=", req.body)
  //console.dir(req.body, { depth: null });
    
    
    const Eidikotita = professionMap[Eidikotites];
    //console.log(Eidikotita)
    // Normalize Epimerous to always be array
   const normalizedServices = services.map(service => ({
      ...service,
      Epimerous: Array.isArray(service.Epimerous)
        ? service.Epimerous
        : service.Epimerous
          ? [service.Epimerous]
          : []
    }));

       
    const EpimerousArray = Array.isArray(Epimerous)
      ? Epimerous
      : Epimerous ? [Epimerous] : [];

    const Epimerous1 = EpimerousArray.join(', ');

    


    // Prepare rows for insertion
    const rows = normalizedServices.map(service => ({
      created_at: created_at ,
      Onoma,
      Epitheto,
      Epimerous1:Epimerous1,
      Eidikotita: Eidikotita,
      Perifereia:service.Perifereia,
      Nomos:service.Nomos,
      Poli: service.Poli,
      Eidikotites: Eidikotites,
      Phone: service.Phone,
      Prosthetes: service.Prosthetes,
      Diathesimotita: service.Diathesimotita,
      Timi: parseInt(service.Timi),
      
      
    }));

  //console.dir(rows, { depth: null });

   await TechnicianWithAccount(rows);

     

  res.render("technicianformwithoutaccount.ejs", {
      message: "Τα στοιχεία σας στάλθηκαν επιτυχώς! H Καταχώρηση σας είναι Δωρεάν!",
      submitbutton: true,
      optionsMap:optionsMap
    });

  } catch (error) {
     console.log("Post Technician without Account Error");
    next(error);
  }
};




export const mycardsnew  = async (req, res, next) => {
 try{ 
   const { userId } = req.userInfo;
   const  techniciancards= await  getMyTechnicianDataWithAccount(userId) ;

   

   res.render("mycards.ejs",{
     techniciancards: techniciancards,
     optionsMap:optionsMap,
     professionMap:professionMap
    }); 
  } catch (error){
     next(error);
  } 

};


export const advice  = async (req, res) => {
    res.render("simvoules.ejs"); 
};


export const showterms = async (req, res) => {
  res.render("terms.ejs");
};


export const collabpage = async (req, res) => {
  res.render("technicianform.ejs",{
    optionsMap:optionsMap
  });
};


export const collabpage1 = async (req, res) => {
  console.log("Technician Without Account");
  res.render("technicianformwithoutaccount.ejs",{
    optionsMap:optionsMap
  });
};


export const contactpage = async  (req, res) => {
 res.render("epikoinwnia.ejs");
};



export const editmycard =  async  (req, res) => {
// console.log('Updated');
   
     try {
 
     const id = req.params.id;
 
     // user comes from authMiddleware
     const {  userId } = req.userInfo;
 
     //console.log("editmycard",id, " ",username, " ", userId)
    // console.log(req.body)
   
     const {
       Eidikotites,
       Perifereia,
       Nomos,
       Poli,
       Timi,
       Prosthetes,
       Diathesimotita,
       Phone,
       Epimerous1
     } = req.body;
    
     const Eidikotita = professionMap[Eidikotites];
    // console.log("Eid",Eidikotita)
     const updatedFields = {
       Eidikotites,
       Eidikotita,
       Perifereia,
       Nomos,
       Poli,
       Timi,
       Prosthetes,
       Diathesimotita,
       Phone,
       Epimerous1: Array.isArray(Epimerous1)
         ? Epimerous1.join(",")
         : Epimerous1
     };
 
     const error = await updatemycard(userId, id, updatedFields);
 
     if (error) {
       return res.json({
         success: false,
         message: error.message
       });
     }
 
     res.json({ success: true });
 
   } catch (err) {
      next(err);
    // console.error(err);
 
     res.json({
       success: false,
       message: "Server error"
     });
 
   }
 
 
};




export const deletemycard = async (req, res, ) => {
 try{ 
   const {  userId } = req.userInfo;
   const id = req.params.id;
  // console.log("delete="," ",id, " ", userId); 


   const error = await deletecard(userId, id);
  
 
     if (error) {
       return res.json({
         success: false,
         message: error.message
       });
     }
  // res.json({ success: true });
   res.redirect("/mycards");
 }
 catch (err) {
 
    // console.error(err);
 
     res.json({
       success: false,
       message: "Server error"
     });
 
   }

};

export const becometechnician =  async (req, res) => {
  if (req.user) {
    return res.redirect("/technician");
  }

  res.render("become-technician", {
    user: null
  });
};



export const profile = async (req, res, next) => {
    res.render("profile.ejs"); 
};

export const profilechangepassword = async (req,res)=>{
  try{
      const {currentPassword,newPassword,confirmPassword} = req.body;
      const {  userId } = req.userInfo;
          
          const user =  await profilemodelcurrentpassword(userId);  

          
          /* check current password */
          const valid = await bcrypt.compare(currentPassword, user[0].password);
         

          if(!valid){
          return res.render("profile",{message:"Λάθος τρέχων κωδικός."});
          }

          if(newPassword !== confirmPassword){
          return res.render("profile",{message:"Οι νέοι κωδικοί δεν ταιριάζουν."});
          }

          const hashed = await bcrypt.hash(newPassword,10);
        
          await profilemodelchangepassword( hashed,userId);


          res.render("profile",{message:"Ο κωδικός άλλαξε επιτυχώς."});
        }
        catch(error){
           res.json({success: false, message: "Server error"});  
        }     

    };


export const profiledeleteaccount = async (req,res)=>{
    
 try{   
  const { userId } = req.userInfo;

    const {confirmText} = req.body;

    if(confirmText !== "DELETE"){
    return res.render("profile",{message:"Πληκτρολογήστε σωστά DELETE."});
    }

  

    await profilemodeldeleteaccount(userId);
    res.clearCookie("token"); // if cookie

    res.redirect("/");
  } 
  catch(error){
           res.json({success: false, message: "Server error"});  
        }     

};    