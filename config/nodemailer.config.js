import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

const user = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;

/*
  if you are using gmail, you have to follow the instructions given by nodemailer,
  you can read it at https://nodemailer.com/usage/using-gmail/ 
*/

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: pass,
  }
});

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  transporter.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: 
    ` 
      <h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
      </div>
    `,
    
  }).catch(err => console.log(err));
}