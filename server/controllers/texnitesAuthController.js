import { createAccountTechnician,
         checkExistingTechnician,
         findUserByUsername,
       }
        from "../models/texnitesModel.js";
import { tokenfinduserbyusername,
         resettokenexpires, 
         tokenfinduserbytoken,
         tokenpasswordtokenupdate 
      } from "../models/texnitesModel.js";
import { sendEmailResetPassword } from "../services/emailService.js";
import bcrypt from "bcryptjs";   
import  jwt  from "jsonwebtoken";      
import crypto  from "crypto"; 



export const createaccount = async  (req, res) => {
 res.render("createaccount.ejs");
};

 

//register controller
export const registerUser = async (req, res) => {
  try {
    //extract user information from our request body
    const { username, password } = req.body;
    

    const checkExistingUser = await checkExistingTechnician(username);
   

    if (checkExistingUser) {
        return res.status(400).json({
        success: false,
        message:
          "User is already exists either with same username(email). Please try with a different email",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in your database
    const newlyCreatedUser = await createAccountTechnician(username, hashedPassword) ; 
   
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



export const submitaccount = async  (req, res) => {
   try{
   //console.log(req.body)

    res.render("createaccount.ejs", {
      message: "Ο Λογιαρασμός σας δημιουργήθηκε Επιτυχώς!",
      submitbutton: true
    });
  }
 catch (error) {
    next(error);
};
};


//login controller


export const loginaccount = async  (req, res) => {
 res.render("login.ejs");
};


export const loginUser = async (req, res) => {
  try {
     let { username, password } = req.body;
   
    username = username.trim();
    username = username.replace(/\s+/g, "");
    console.log(username, password)
    //find if the current user is exists in database or not
    const user = await findUserByUsername(username);
      //  console.log(user);
    
     /* ---------------- CHECK IF PHONE ---------------- */
   
    
    const isPhone = /^\d+$/.test(username); // only digits
   

     if (isPhone) {
      // must start with 69 and be 10 digits (Greek mobile)
      
      console.log(username);
      if (!/^69\d{8}$/.test(username)) {
        return res.status(400).render("login", {
          errorMessage: "Μη έγκυρος αριθμός τηλεφώνου (πρέπει να ξεκινά από 69)"
        });
      }
    }  
      

    if (!user) {
      return res.status(400).render("login", {
      errorMessage: "Ο χρήστης δεν υπάρχει"
    });
    }


    //if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      /*return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });*/
      return res.status(400).render("login", {
      errorMessage: "Λανθασμένα στοιχεία σύνδεσης"
    });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role:user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    
    
    
    // ✅ STORE TOKEN IN COOKIE
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    //res.render("technicianform.ejs");
    // return res.redirect("/technician");
    if (user.role === "admin") {
         return res.redirect("/admin");
    } else {
        return res.redirect("/technician");
    }

     
  } catch (error) {
    //console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");   // remove JWT cookie
  res.redirect("/");
};



export const forgotpassword = async  (req, res) => {
 res.render("forgotpassword.ejs");
};


export const forgetpasswordtoken = async (req,res)=>{

        const {email} = req.body;

        try{
          
        console.log(email);
        const user = await tokenfinduserbyusername(email);
        //console.log(user);
        //console.log(user.id); 

        if(!user){
              return res.render("forgotpassword",{
              message:"Δεν βρέθηκε χρήστης με αυτό το email."
              });
        }

        /* create token */

        const token = crypto.randomBytes(32).toString("hex");

        const expires = new Date(Date.now()+4*3600000); //1 hour

        /* save token */

        console.log("token=",token);
        console.log("expires=",expires); 

        await  resettokenexpires(user.id, token, expires);

        /* reset link */

      // const link = `http://localhost:3000/resetpassword/${token}`;
        const link = `${process.env.BASE_URL}/resetpassword/${token}`;

        /* send email */
        await sendEmailResetPassword(email, link);
        /*await transporter.sendMail({

        to:email,
        subject:"Επαναφορά Κωδικού",
        html:`
        <h3>Επαναφορά Κωδικού</h3>
        <p>Πατήστε το παρακάτω link για να ορίσετε νέο κωδικό:</p>
        <a href="${link}">${link}</a>
        <p>Το link ισχύει για 1 ώρα.</p>
        `

        });*/

        res.render("forgotpassword",{
        message:"Σας στείλαμε email για επαναφορά κωδικού."
        });

        }catch(err){

        console.log(err);

        res.render("forgotpassword",{message:"Σφάλμα server"});

        }

};



export const resetpasswordtoken = async  (req, res) => {
  const { token } = req.params;
 res.render("resetpassword", {
    token,        
    message: null // optional
  });
};

export const resetnewpassowrdnulltoken = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;


  try {
    // 🔍 Find user with token + check expiration
   
   //  console.log(token, password);
     const user = await tokenfinduserbytoken(token); 

    if ( !user) {
      return res.render("resetpassword", {
        token,
        message: "Μη έγκυρο ή ληγμένο link."
      });
    }

    // ⏰ Check expiration
    if (new Date(user.reset_expires) < new Date()) {
      return res.render("resetpassword", {
        token,
        message: "Το link έχει λήξει."
      });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Update password + clear token
    await tokenpasswordtokenupdate(hashedPassword, user.id);

    res.render("login", {
      message: "Ο κωδικός ενημερώθηκε επιτυχώς."
    });

  } catch (err) {
    console.error(err);
    res.render("resetpassword", {
      token,
      message: "Σφάλμα server"
    });
  }
}



