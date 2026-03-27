import { createTechnicianWithAccount, getMyTechnicianDataWithAccount, 
    getMyTechnicianSpecificDataWithAccount ,updateMyTechnicianSpecificDataWithAccount } from "../models/texnitesModel.js";



export const AccountRegisterCard = async (req, res) => {
 const { username, userId } = req.userInfo;
  //console.log('welcome');

  res.json({
    message: "Welcome to the Registration page",
    user: {
      id: userId,
      username,
    },
  });
};



export const AccountPostRegisterCard = async (req, res) => {
 const { username, userId } = req.userInfo;
  //console.log('welcome ',username," ",userId )
  const {Onoma, Epitheto, Poli,  Eidikotites,  Epimerous, Prosthetes,   Diathesimotita,  Phone } = req.body;

    const professionMap = {
      'Υδραυλικοί': 'Υδραυλικός',
      'Ηλεκτρολόγοι': 'Ηλεκτρολόγος',
      'Ξυλουργοί': 'Ξυλουργός',
      'Ελαιοχρωματιστές': 'Ελαιοχρωματιστής',
      'Επιπλοποιοί': 'Επιπλοποιός',
      'Τεχνικοί Θερμομόνωσης': 'Τεχνικός Θερμομόνωσης',
      'Καθαρισμός': 'Καθαριστής',
      'Μετακομίσεις-Μεταφορές' :'Μετακομίσεων/Μεταφορών',
      'Οικιακές Συσκευές':'Τεχνίτης Οικιακών Συσκευών',
      'Γυψοσανίδες':  'Τεχνιτης Γυψοσανιδών' ,
      'Οικοδομικές Εργασίες':  'Οικοδόμος' ,
       'Τοποθέτηση Πλακιδίων': 'Τεχνίτης Πλακιδίων',
       "Τοποθέτηση Κουφωμάτων":'Τοποθέτηση Κουφωμάτων',
      "Ψυκτικοί":'Ψυκτικός',
      "Κηπουροί":'Κηπουρός',
       "Πολιτικοί Μηχανικοί": "Πολιτικός Μηχανικός",
       "Οικονομολόγοι-Λογιστές": "Οικονομολόγος-Λογιστής",
      "Άλλη Κατηγορία": "Άλλη Κατηγορία",
    };

  


     const Eidikotita = professionMap[Eidikotites];
  

   // message = "Τα στοιχεία σας στάλθηκαν επιτυχώς! H Καταχώρηση σας είναι Δωρεάν!"; // για 3 μήνες!
   const submitbutton =  true;
      
    const EpimerousArray = Array.isArray(Epimerous)
      ? Epimerous
      : Epimerous ? [Epimerous] : [];

    const Epimerous1 = EpimerousArray.join(', ');
    
       
    let { Timi } = req.body;
    if (Timi === '') {
    Timi = null;
    } else {
    Timi = Number(Timi); // or parseInt(Timi, 10) for integers
    }

  



  const created_at = new Date(); 
  
 createTechnicianWithAccount({
     created_at,  
     Onoma, 
     Epitheto,
     Eidikotita,
     Poli,
     Timi, 
     Eidikotites, 
     Epimerous1, 
     Prosthetes,
     Diathesimotita, 
     Phone,
     user_id:userId
      });

  res.json({
    message: "Welcome to the Registration page",
    user: {
      user_id: userId,
      username,
      Onoma,
      Epitheto,
      Eidikotita, 
      Poli,
      Timi, 
      Eidikotites, 
      Epimerous1,
      Prosthetes,
      Diathesimotita, 
      Phone
    },
  });
};


export const AccountCards  = async (req, res) => {
      
      const { username, userId } = req.userInfo;
      //console.log('welcome getall cards');
    
      const users= await  getMyTechnicianDataWithAccount(userId);
      console.log(users);
      // await findUserByUsername
      //console.log(data);
    
      res.json({
        message: "Welcome to the editing/updated Cards page",
        user: {
          id: userId,
          username,
        },
      });

};

export const AccountEditCard  = async (req, res) => {
  try {
    const recordId = req.params.id;
    const {username,  userId } = req.userInfo;

    const existingData =  await getMyTechnicianSpecificDataWithAccount(userId, recordId);

   
    if (!existingData) {
      return res.status(404).json({ message: "Record not found" });
    }

    // 2️⃣ Dynamically build update object
    const updatedFields = {};

    Object.keys(req.body).forEach((key) => {
      let newValue = req.body[key];
      let oldValue = existingData[key];

      // Convert numeric fields properly (important!)
      if (key === "Timi" && newValue !== "") {
        newValue = Number(newValue);
      }

      // Skip undefined values
      if (newValue === undefined) return;

      // Only update if changed
      if (newValue !== oldValue) {
        updatedFields[key] = newValue;
      }
    });

    // 3️⃣ If nothing changed → skip update
    if (Object.keys(updatedFields).length === 0) {
      return res.json({
        message: "No changes detected",
        updatedFields: {}
      });
    }

    const updateError = await updateMyTechnicianSpecificDataWithAccount(userId,recordId,updatedFields);

    if (updateError) throw updateError;

    res.json({
      message: "Card updated successfully",
      updatedFields
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating card" });
  }
};