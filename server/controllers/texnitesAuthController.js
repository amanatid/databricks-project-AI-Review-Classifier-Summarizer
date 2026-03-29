import { createAccountTechnician,
         checkExistingTechnician,
         findUserByUsername,
         resetpasswordcheckuser,
         resetpasswordupdatepassword  }
        from "../models/texnitesModel.js";
import bcrypt from "bcryptjs";   
import  jwt  from "jsonwebtoken";
import { sendContactEmail } from "../services/emailService.js";



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
        message: "Unable to register user! please try again.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
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
    const { username, password } = req.body;
    //console.log(username, password)

    //find if the current user is exists in database or not
    const user = await findUserByUsername(username);
      //  console.log(user);

    if (!user) {
      /*return res.status(400).json({
        success: false,
        message: `User doesn't exists`,
      });*/
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
     return res.redirect("/technician");

     
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


export const resetpassword = async  (req, res) => {

      
      const{email,password, confirmPassword}  = req.body;


    try {

    /* ---------------- PASSWORD CHECKS ---------------- */

    if (password !== confirmPassword) {
      return res.render("forgotpassword", {
        message: "Οι κωδικοί δεν ταιριάζουν."
      });
    }

    if (password.length < 7) {
      return res.render("forgotpassword", {
        message: "Ο κωδικός πρέπει να έχει τουλάχιστον 7 χαρακτήρες."
      });
    }

    /* ---------------- CHECK USER ---------------- */

    const error = await resetpasswordcheckuser(email);

    if (error ) {
      return res.render("forgotpassword", {
        message: "Δεν βρέθηκε χρήστης με αυτό το email."
      });
    }

    /* ---------------- UPDATE PASSWORD ---------------- */
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await sendContactEmail(email, password);
    const updateError = await  resetpasswordupdatepassword(email,hashedPassword);
    if (updateError) {
      return res.render("forgotpassword", {
        message: "Σφάλμα κατά την αλλαγή του κωδικού."
      });
    }

    /* ---------------- SUCCESS ---------------- */
   

    res.render("forgotpassword", {
      message: "Ο κωδικός σας άλλαξε επιτυχώς."
    });

  } catch (err) {

    console.error(err);

    res.render("forgotpassword", {
      message: "Παρουσιάστηκε σφάλμα."
    });

  }




};

