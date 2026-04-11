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



export const sendEmailResetPassword = async ( email,  link ) => {

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false,
  });

  

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Επικοινωνία",
    html: `
        <h3>Επαναφορά Κωδικού</h3>
        <p>Πατήστε το παρακάτω link για να ορίσετε νέο κωδικό:</p>
        <a href="${link}">${link}</a>
        <p>Το link ισχύει για 1 ώρα.</p> `
  };

  await transporter.sendMail(mailOptions);
};
