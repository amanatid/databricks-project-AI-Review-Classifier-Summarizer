import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendContactEmail = async ( email,  text ) => {

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false,
  });

  const name= "O Nέος σας κωδικός είναι:";
  const  ektimisi = "Με Εκτίμηση,";
  const  houseconsulting ="H Oμάδα του HouseConsulting" ;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Επικοινωνία",
    text: `${name}\n${text}\n\n${ektimisi}\n${houseconsulting}`,
  };

  await transporter.sendMail(mailOptions);
};
