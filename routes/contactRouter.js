import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password'   // Replace with your email password or app password
    }
  });
  
  router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const mailOptions = {
      from: email,
      to: 'hermessfitness@gmail.com',
      subject: `Message from ${name}`,
      text: message
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  

export default router;

