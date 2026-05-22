import { sendEmailResetPassword } from "../services/emailService.js";
import bcrypt from "bcryptjs";   
import  jwt  from "jsonwebtoken";      
import crypto  from "crypto"; 
import {   checkExistingGuest,
           createAccountGuest  } from  "../models/texnitesModelGuest.js"
import { greekMunicipalities } from "../public/data/greekMunicipalities.js";

export const createguestaccount = async(req, res)=>{
  res.render("createguestaccount.ejs",{
      greekMunicipalities
   });
}

 

//register controller
export const registerGuestAccount = async (req, res) => {
  try {
    //extract user information from our request body
    const { username, password,name,surname, phone,city } = req.body;
    
      
   const normalizedUsername = username.trim().toLowerCase();

    // check if email
   const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedUsername);

    // normalize phone
    let normalizedPhoneUsername = normalizedUsername
      .replace(/\s+/g, "")   // remove spaces
      .replace(/-/g, "")     // remove dashes
      .replace(/^\+30/, "")  // remove +30
      .replace(/^30/, "");   // remove 30

    // check if greek mobile
    const isGreekMobile =  /^69\d{8}$/.test(normalizedPhoneUsername);

    // ❌ if neither email nor phone → reject
    if (!isEmail && !isGreekMobile) {
      return res.render("register", {
        message: "Το username πρέπει να είναι έγκυρο email ή κινητό (69XXXXXXXX)",
        submitbutton: false
      });
    }

    // ✅ if it's phone → store normalized version
    const finalUsername = isGreekMobile
      ? normalizedPhoneUsername
      : normalizedUsername;

  
  
    const editedphone=phone.trim()                  // remove leading/trailing spaces
             .replace(/\D/g, "")                   // remove all non-digits (spaces, dashes, etc.)
             .replace(/^30/, "")
   
    // ❌ validate phone field (REQUIRED)
    if (!/^69\d{8}$/.test(editedphone)) {
      return res.render("createguestaccount", {
        message: "Το κινητό πρέπει να ξεκινά από 69 και να έχει 10 ψηφία",
        submitbutton: false
      });
    }         

    const checkExistingUser = await checkExistingGuest(finalUsername);
   

    if (checkExistingUser) {
        return res.render("createguestaccount", {
        message: "Ο χρήστης υπάρχει ήδη. Δοκιμάστε άλλο email ή κινητό",
        submitbutton: false
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   

    //create a new user and save in your database
    console.log('create user');
    const newlyCreatedUser = await createAccountGuest(finalUsername, 
                                                      hashedPassword ,
                                                      name,
                                                      surname,
                                                      editedphone,
                                                      city
                                                      ) ; 
    
   
    if (newlyCreatedUser) {
      res.render("createaccount.ejs", {
      message: "Ο Λογιαρασμός σας δημιουργήθηκε Επιτυχώς!",
      submitbutton: true
    });
    } else {
      res.status(400).json({
        success: false,
        message: "Δεν ήταν δυνατή η εγγραφή του χρήστη. Παρακαλώ δοκιμάστε ξανά.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
    });
  }
};


